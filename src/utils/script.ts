import fetch from 'node-fetch';
import cron from 'node-cron';
import { eventsCollection } from '../db/models/event.js';
import { connectToMongoDB } from '../db/initMongoDB.js';
import { env } from './env.js';
import { participantsCollection } from '../db/models/participant.js';

const apiKey = env('API_KEY');

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData(country: string, pages: number) {
  const type = 'event';
  let parsePages = 0;

  const possiblePages = await getTotalPagesForCountry(country);
  parsePages = Math.min(possiblePages, pages);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = [];

  console.log(
    'Fetching events from 3rd API is running... Please, wait a little. Results will display in console',
  );
  try {
    const requests = [];

    for (let page = 0; page < parsePages; page++) {
      const apiLink = `https://app.ticketmaster.com/discovery/v2/events.json?type=${type}&countryCode=${country}&page=${page}&includeFamily=no&apikey=${apiKey}`;
      requests.push(fetch(apiLink).then((response) => response.json()));

      await delay(2500);
    }

    const responses = await Promise.all(requests);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responses.forEach((data: any) => {
      if (data?._embedded?.events?.length) {
        result = result.concat(data._embedded.events);
      } else {
        console.log(`No events found for page: ${data.page?.number}`);
      }
    });

    console.log(`Parsed ${result.length} events for storing...`);

    return result;
  } catch (e) {
    console.log('Error with fetching', e);
    return [];
  }
}

async function getTotalPagesForCountry(country: string) {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?type=event&countryCode=${country}&page=0&includeFamily=no&apikey=${apiKey}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await response.json();
    return data.page?.totalPages || 0;
  } catch (e) {
    console.log('Error while getting total pages for city:', e);
    return 0;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformData(data: any) {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedData = data.map((event: any) => {
    const dateObj = new Date(event.dates.start.dateTime);

    const isValidDate = dateObj instanceof Date && !isNaN(dateObj.getTime());

    let date: string = '';

    if (isValidDate) {
      const day = dateObj.getUTCDate();
      const month = dateObj.toLocaleString('en-US', { month: 'long' });
      const year = dateObj.getUTCFullYear();
      date = `${day} ${month} ${year}`;
    } else {
      date = 'Unknown';
    }

    return {
      name: event.name,
      humanDate: date,
      date: event.dates.start.dateTime || null,
      type: event.classifications?.[0]?.segment?.name || 'Unknown',
      promoter: event.promoter?.name || 'Unknown',
      venue: event._embedded?.venues?.[0]?.name || 'Unknown',
      city: event._embedded?.venues?.[0]?.city?.name || 'Unknown',
      imageUrl: event.images?.find(
        (image: { width: number; height: number; url: string }) =>
          image.width === 640 && image.height === 360,
      )?.url,
    };
  });

  const uniqueEvents = new Map();

  transformedData.forEach((event) => {
    const key = `${event.name}-${event.date}-${event.city}`;
    if (!uniqueEvents.has(key)) {
      uniqueEvents.set(key, event);
    }
  });

  const dataWithoutDuplicates = Array.from(uniqueEvents.values());
  const eventsWithDates = dataWithoutDuplicates.filter(
    (event) => event.humanDate !== 'Unknown',
  );

  return eventsWithDates;
}

const launchFetch = async (country: string, pages: number) => {
  const data = await fetchData(country, pages);
  if (!data || !data.length) {
    console.log('No data to insert');
    return;
  }

  await eventsCollection.deleteMany({});

  const transformedData = transformData(data);
  try {
    await eventsCollection.insertMany(transformedData);
    console.log(
      `Events from 3rd API have been saved in database!. Number of events in DB: ${transformedData.length}`,
    );
  } catch (e) {
    console.log('Error saving events to database:', e);
  }

  const participantsWithEvents = await participantsCollection.find({
    'events.0': { $exists: true },
  });

  for (const participant of participantsWithEvents) {
    for (const event of participant.events) {
      const eventToUpdate = await eventsCollection.findOne({
        name: event.eventName,
        date: event.eventDate,
        city: event.eventCity,
      });

      if (eventToUpdate) {
        await eventsCollection.updateOne(
          { _id: eventToUpdate._id },
          { $addToSet: { participants: participant._id } },
        );
      }
    }
  }
};

cron.schedule('1 0 * * *', async () => {
  await connectToMongoDB();
  await launchFetch('DE', 40);
  process.exit(0);
});
