// functions to search everythign up 
import { query } from "express";
import { activities, events, reviews } from "../config/mongoCollections.js";

const searchActivity = async (query) => {
    const activityCollection = await activities();
    const regex = new RegExp(query, 'i'); 
    const activitiesList = await activityCollection.find({ activities: regex }).toArray();
    return activitiesList;
}

const searchEvent = async (query) =>  {
    const eventCollection = await events();
    const regex = new RegExp(query, 'i');
    const eventList = await eventCollection.find({ events: regex }).toArray();
    return eventList;
}

const searchReview = async (query) => {
    const reviewCollection = await reviews();
    const regex = new RegExp(query, 'i');
    const reviewList = await reviewCollection.find({ reviews: regex }).toArray();
    return reviewList;
}

export { searchActivity, searchEvent, searchReview }
