import { eventsCollection } from '../db/models/event.js';
import { participantsCollection } from '../db/models/participant.js';
import { IEvent } from '../types/events.js';
import { IParticipant } from '../types/participants.js';
import { sortOrderEnum } from '../types/sortOrder.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

interface IGetAllEventsResponse {
  data: IEvent[] | [];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const getAllEvents = async ({
  sortBy,
  sortOrder,
  page,
  perPage,
}: {
  sortBy: string;
  sortOrder: sortOrderEnum;
  page: number;
  perPage: number;
}): Promise<IGetAllEventsResponse> => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const eventsQuery = eventsCollection.find();

  const [eventsCount, events] = await Promise.all([
    eventsCollection.find().merge(eventsQuery).countDocuments(),
    eventsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(eventsCount, perPage, page);

  return { data: events, ...paginationData };
};

export const getEventById = async (eventId: string): Promise<IEvent | null> => {
  const event = await eventsCollection.findOne({ _id: eventId });
  return event;
};

export const createEvent = async (
  payload: Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<IEvent> => {
  const event = await eventsCollection.create(payload);
  return event;
};

export const deleteEvent = async (eventId: string): Promise<IEvent | null> => {
  const deletedEvent = await eventsCollection.findOneAndDelete({
    _id: eventId,
  });
  return deletedEvent;
};

export const getEventParticipants = async (
  participantsIds: Pick<IParticipant, '_id'>[],
) => {
  const participants = await participantsCollection.find(
    { _id: { $in: participantsIds } },
    { fullName: 1, email: 1, createdAt: 1, events: 1 },
  );

  return participants;
};
