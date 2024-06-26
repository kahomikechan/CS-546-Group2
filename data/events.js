//Description/Photos (Time, Location, external link, etc)

//import
import { events } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';

const createEvent = async (eventData) => {
    const eventCollection = await events();
    // Extract date and time from datetime-local input
    const dateTime = new Date(eventData.time);
    const eventDate = dateTime.toISOString().split('T')[0]; // Extract date
    const eventTime = dateTime.toTimeString().split(' ')[0]; // Extract time
    const newEvent = {
        eventName: eventData.eventName,
        eventAddress: eventData.eventAddress,
        eventDescription: eventData.eventDescription,
        eventDate: eventDate,
        time: eventTime,
        eventContact: eventData.eventContact,
        eventType: eventData.eventType,
        eventAccommodations: eventData.eventAccommodations,
        eventPriceRange: eventData.eventPriceRange,
        participants: eventData.participants
    };
    const insertInfo = await eventCollection.insertOne(newEvent);
    if (insertInfo.insertedCount === 0) throw new Error("Could not add event.");
    if (!newEvent.eventName || !newEvent.eventAddress || !newEvent.eventDescription || !newEvent.time || !newEvent.eventContact || !newEvent.eventType || !newEvent.eventAccommodations || !newEvent.eventPriceRange
        || !newEvent.participants || !newEvent.eventDate) throw new Error("All fields must have input.");
    return newEvent;
};

const getAllEvents = async () => {
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    return eventList;
};

const getEvent = async (eventId) => {
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id : new ObjectId(eventId)});
    if (!event) throw new Error("Event not found.");
    return event;
};

const removeEvent = async (eventId) => {
    const eventCollection = await events();
    const deletedEvent = await eventCollection.findOneAndDelete({_id : new ObjectId(eventId)});
    if (deletionInfo.deletedCount === 0) throw new Error("Could not find event to remove.");

    return `${deletedEvent.eventName} has been deleted.`;
};

const updateEvent = async (
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
    const eventCollection = await events();

    const updatedEvent = {
        $set: {
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
        }
    };

    const updateInfo = await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $set: updatedEvent });

    if (updateInfo.modifiedCount === 0) throw new Error('Could not update event');

    const updatedEventDoc = await eventCollection.findOne({ _id: new ObjectId(eventId) });
    if (!updatedEventDoc) throw new Error('Updated event not found');

    return updatedEventDoc;
};

export { createEvent, getAllEvents, getEvent, removeEvent, updateEvent }