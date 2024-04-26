import { ObjectId } from 'mongodb';
import { activities } from "../config/mongoCollections.js";

const createActivity = async (
    activityName,
    activityAddress,
    activityHours,
    activityType,
    rating,
    activityAccommodations,
    activityPriceRange,
    reviews,
    activityLink,
    activityDescription
) => {
    
    const activityCollection = await activities();

    const newActivity = {
        activityName,
        activityAddress,
        activityHours,
        activityType,
        rating,
        activityAccommodations,
        activityPriceRange,
        reviews,
        activityLink,
        activityDescription
      };

      const insertInfo = await activityCollection.insertOne(newActivity);
      if (insertInfo.insertedCount === 0) throw new Error("Could not add activity");
    
      return newActivity;
    };



const getAllActivities = async () => {
    const activityCollection = await activities();
    const activityList = await activityCollection.find({}).toArray();
    return activityList;
};

const getActivity = async (activityId) => {
    if (!activityId || typeof activityId !== 'string' || !ObjectId.isValid(activityId))
    throw new Error("Invalid activity ID");

    const activityCollection = await activities();
    const activity = await activityCollection.findOne({ _id: new ObjectId(activityId) });
    if (!activity) throw new Error("Activity not found");

    return activity;
};


const removeActivity = async (activityId) => {
    if (!activityId || typeof activityId !== 'string' || !ObjectId.isValid(activityId))
    throw new Error("Invalid activity ID");

    const activityCollection = await activities();
    const deletionInfo = await activityCollection.deleteOne({ _id: new ObjectId(activityId) });
    if (deletionInfo.deletedCount === 0) throw new Error("Could not delete activity");

    return true;
};

const updateActivity = async (
    activityId,
    updatedActivityData
) => {
    if (!activityId || typeof activityId !== 'string' || !ObjectId.isValid(activityId))
    throw new Error("Invalid activity ID");

    const activityCollection = await activities();

    const updatedActivity = {
        $set: updatedActivityData
  };

    const updateInfo = await activityCollection.updateOne({ _id: new ObjectId(activityId) }, updatedActivity);
    if (updateInfo.modifiedCount === 0) throw new Error("Could not update activity");

    return true;
};

export { createActivity, getAllActivities, getActivity, removeActivity, updateActivity };
