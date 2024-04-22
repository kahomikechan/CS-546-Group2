import express from 'express';
import { createActivity, getAllActivities, getActivity, removeActivity, updateActivity } from '../data/activities.js';

const router = express.Router();

//create activity
router.post('/', async (req, res) => {
  try {
    const activity = req.body; 
    const newActivity = await createActivity(activity);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all activities
router.get('/', async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a specific activity by ID
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    await removeActivity(activityId);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
