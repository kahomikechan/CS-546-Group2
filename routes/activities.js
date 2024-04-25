import express from 'express';
import { createActivity, getAllActivities, getActivity, removeActivity, updateActivity } from '../data/activities.js';

const activitiesRouter = express.Router();

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden' });
  }
};

//create activity - only admin
activitiesRouter.post('/createActivity', isAdmin, async (req, res) => {
  try {
    const {activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription} = req.body;
    const newActivity = await createActivity(activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all activities - logged in user
activitiesRouter.get('/allActivities', async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a specific activity by ID - logged in user
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

// update an existing activity - only admin
activitiesRouter.put('/updateActivity/:id', isAdmin, async (req, res) => {
  try {
    const activityId = req.params.id;
    const updatedActivity = req.body;
    await updateActivity(activityId, updatedActivity);
    res.json({ message: 'Activity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete an activity - only admin
activitiesRouter.delete('/deleteActivity/:id', isAdmin, async (req, res) => {
  try {
    const activityId = req.params.id;
    await removeActivity(activityId);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default activitiesRouter;
