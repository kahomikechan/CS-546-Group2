// functions to search everythign up 
import { activities, events } from "../config/mongoCollections.js";

const searchActivity = async (query) => {
    const activityCollection = await activities();
    const regex = new RegExp(query, 'i'); 
    const activitiesList = await activityCollection.find({ activityName: regex }).toArray();
    if (activitiesList.length === 0) throw new Error('Activity not found');
    if (!activitiesList) throw new Error('Activity not found');

    return activitiesList;
}

const searchEvent = async (query) =>  {
    const eventCollection = await events();
    const regex = new RegExp(query, 'i');
    const eventsList = await eventCollection.find({ eventName: regex }).toArray();
    if (eventsList.length === 0) throw new Error('Event not found')
    if (!eventsList) throw new Error('Event not found')
    
    return eventsList;

}

export { searchActivity, searchEvent }
