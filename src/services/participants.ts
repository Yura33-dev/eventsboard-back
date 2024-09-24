import { eventsCollection } from '../db/models/event.js';
import { participantsCollection } from '../db/models/participant.js';
import { IEvent } from '../types/events.js';
import { IParticipant } from '../types/participants.js';

export const createRegistration = async (
  payload: Omit<IParticipant, '_id' | 'createdAt' | 'updatedAt'>,
  eventId: string,
) => {
  const event: IEvent | null = await eventsCollection.findOne({ _id: eventId });
  if (!event) return false;

  let participant: IParticipant | null = await participantsCollection.findOne({
    email: payload.email,
  });

  if (participant) {
    const isRegistered = participant.events.some(
      (participantEvent) =>
        participantEvent.eventName === event.name &&
        participantEvent.eventDate.getTime() === event.date.getTime() &&
        participantEvent.eventCity === event.city,
    );

    if (isRegistered) return false;

    // Если регистрации на это мероприятие нет, добавляем событие в массив events участника
    await participantsCollection.findOneAndUpdate(
      { _id: participant._id },
      {
        $push: {
          events: {
            eventName: event.name,
            eventDate: event.date,
            eventCity: event.city,
          },
        },
      },
    );
  } else {
    participant = await participantsCollection.create({
      ...payload,
      events: [
        {
          eventName: event.name,
          eventDate: event.date,
          eventCity: event.city,
        },
      ],
    });
  }

  if (!event.participants.includes(participant._id)) {
    await eventsCollection.findOneAndUpdate(
      { _id: eventId },
      {
        $push: { participants: participant._id },
      },
    );
  }

  return true;
};
