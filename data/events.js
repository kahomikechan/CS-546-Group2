//Description/Photos (Time, Location, external link, etc)

//import

import { Event } from "../models/events";

export const createEvent = async (
    eventName,
    eventAddress,
    eventDescription,
    time,
    eventContact,
    eventType,
    eventAccommodations,
    eventPriceRange,
    participants
) => {
    try {
        const event = await Event.create({
            eventName,
            eventAddress,
            eventDescription,
            time,
            eventContact,
            eventType,
            eventAccommodations,
            eventPriceRange,
            participants
        })
        return event;
    } catch (error) {
        throw new Error('Error creating event.')
    }
};

export const getAllEvents = async () => {
    try {
        return await Event.find();
    } catch (error) {
        throw new Error('Error finding all events.')
    }
};

export const getEvent = async (eventId) => {
    try {
        return await Event.findById(eventId);
    } catch (error) {
        throw new Error('Error finding event.');
    }
};

export const removeEvent = async (eventId) => {
    try {
        return await Event.findByIdAndDelete(eventId);
    } catch (error) {
        throw new Error('Error removing event.');
    }
};

export const updateEvent = async (
    eventId,
    eventName,
    eventDescription,
    eventAddress,
    time,
    eventContact,
    eventType,
    eventAccommodations,
    eventPriceRange,
    participants
) => {
    try {
        return await Event.findByIdAndUpdate(eventId, {
            eventId,
            eventName,
            eventDescription,
            eventAddress,
            time,
            eventContact,
            eventType,
            eventAccommodations,
            eventPriceRange,
            participants
        }, {new : true})
    } catch (error) {
        throw new Error('Error updating event.');
    }
};