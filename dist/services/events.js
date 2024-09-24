import { eventsCollection } from '../db/models/event.js';
import { participantsCollection } from '../db/models/participant.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllEvents = async ({ sortBy, sortOrder, page, perPage, }) => {
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
export const getEventById = async (eventId) => {
    const event = await eventsCollection.findOne({ _id: eventId });
    return event;
};
export const createEvent = async (payload) => {
    const event = await eventsCollection.create(payload);
    return event;
};
export const deleteEvent = async (eventId) => {
    const deletedEvent = await eventsCollection.findOneAndDelete({
        _id: eventId,
    });
    return deletedEvent;
};
export const getEventParticipants = async (participantsIds) => {
    const participants = await participantsCollection.find({ _id: { $in: participantsIds } }, { fullName: 1, email: 1, createdAt: 1, events: 1 });
    return participants;
};
