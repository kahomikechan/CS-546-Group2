//Description/Photos (Time, Location, external link, etc)

//import
import { events, reviews } from "../config/mongoCollections.js";
import { ObjectId } from mongodb;

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
    const eventCollection = await events();

    const newEvent = {
        eventName,
        eventAddress,
        eventDescription,
        time,
        eventContact,
        eventType,
        eventAccommodations,
        eventPriceRange,
        participants
    };

    const insertInfo = await eventCollection.insertOne(newEvent);
    
    if (insertInfo.insertedCount === 0) throw new Error("Could not add event.");

    if (!eventName || !eventAddress || !eventDescription || !time || !eventContact || !eventType || !eventAccommodations || !eventPriceRange
        || !participants) throw new Error("All fields must have input.")

    return newEvent;
};

export const getAllEvents = async () => {
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    return eventList;
};

export const getEvent = async (eventId) => {
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id : ObjectId(eventId)});
    if (!event) throw new Error("Event not found.");
    return event;
};

export const removeEvent = async (eventId) => {
    const eventCollection = await events();
    const deletedEvent = await eventCollection.findOneAndDelete({_id : ObjectId(eventId)});
    if (deletionInfo.deletedCount === 0) throw new Error("Could not find event to remove.");

    return `${deletedEvent.eventName} has been deleted.`;
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

    const updateInfo = await eventCollection.updateOne({ _id: ObjectId(eventId) }, { $set: updatedEvent });

    if (updateInfo.modifiedCount === 0) throw new Error('Could not update event');

    const updatedEventDoc = await eventCollection.findOne({ _id: ObjectId(eventId) });
    if (!updatedEventDoc) throw new Error('Updated event not found');

    return updatedEventDoc;
};