import express from 'express';
import { createActivity, getAllActivities, getActivity, removeActivity, updateActivity } from '../data/activities.js';

const activitiesRouter = express.Router();

//create activity
activitiesRouter.post('/createActivity', async (req, res) => {
  try {
    const {activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription} = req.body;
    const newActivity = await createActivity(activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all activities
activitiesRouter.get('/allActivities', async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a specific activity by ID
activitiesRouter.get('/activity/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await getActivity(activityId);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
    } else {
      res.json(activity);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update an existing activity
activitiesRouter.put('/updateActivity/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    const updatedActivity = req.body; // Assuming request body contains updated activity data
    await updateActivity(activityId, updatedActivity);
    res.json({ message: 'Activity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete an activity
activitiesRouter.delete('/deleteActivity/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    await removeActivity(activityId);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default activitiesRouter;
