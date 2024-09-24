import { createEvent, deleteEvent, getAllEvents, getEventById, getEventParticipants, } from '../services/events.js';
import createHttpError from 'http-errors';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
export const getAllEventsController = async (req, res, next) => {
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const events = await getAllEvents({ sortBy, sortOrder, page, perPage });
    if (events.data.length === 0) {
        return next(createHttpError(404, 'There aren`t any events'));
    }
    res.status(200).json({
        status: 200,
        message: 'Events successfully found',
        data: events,
    });
};
export const getEventByIdController = async (req, res, next) => {
    const { eventId } = req.params;
    const event = await getEventById(eventId);
    if (!event) {
        return next(createHttpError(404, 'Event not found'));
    }
    res.status(200).json({
        status: 200,
        message: 'Event successfully found',
        data: event,
    });
};
export const createEventController = async (req, res) => {
    const event = await createEvent(req.body);
    res.status(201).json({
        status: 201,
        message: 'Event successfully created',
        data: event,
    });
};
export const deleteEventController = async (req, res, next) => {
    const { eventId } = req.params;
    const deletedEvent = await deleteEvent(eventId);
    if (!deletedEvent) {
        return next(createHttpError(404, 'Event not found'));
    }
    res.status(204).send();
};
export const getEventParticipantsController = async (req, res, next) => {
    const { eventId } = req.params;
    const event = await getEventById(eventId);
    if (!event)
        return next(createHttpError(404, 'Event not found'));
    const participantsIds = event.participants;
    const participants = await getEventParticipants(participantsIds);
    res.status(200).json({
        status: 200,
        message: 'Participants successfully found',
        data: participants,
    });
};
