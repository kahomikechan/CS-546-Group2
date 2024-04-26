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

//checks if the user is logged in/approved by admin
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

//create activity - only admin
activitiesRouter.post('/createActivity', isAdmin, async (req, res) => {
  try {
    const {activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription} = req.body;
    const newActivity = await createActivity(activityName, activityAddress, activityHours, activityType, rating, activityAccommodations, activityPriceRange, reviews, activityLink, activityDescription);
    res.render('activities', { newActivity });
  } catch (error) {
    res.render('error', { errorMessage: "Make sure all forms are filled in." });
  }
});

// get all activities - logged in user
activitiesRouter.get('/allActivities', isAuthenticated, async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.render('activities', { allActivities });
  } catch (error) {
    res.render('error', { errorMessage: "Check back later!" });
  }
});

// get a specific activity by ID - logged in user
activitiesRouter.get('/activity/:id', isAuthenticated, async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await getActivity(activityId);
    if (!activity) {
      res.render('error', { errorMessage: "Please enter an activity ID." });
    } else {
      res.render('activitityDetail', { activity });
    }
  } catch (error) {
    res.render('error', { errorMessage: "That activity does not exist." });
  }
});

// // update an existing activity - only admin
// activitiesRouter.put('/updateActivity/:id', isAdmin, async (req, res) => {
//   try {
//     const activityId = req.params.id;
//     const updatedActivity = req.body;
//     await updateActivity(activityId, updatedActivity);
//     res.json({ message: 'Activity updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// delete an activity - only admin
activitiesRouter.delete('/deleteActivity/:id', isAdmin, async (req, res) => {
  try {
    const activityId = req.params.id;
    await removeActivity(activityId);

    const allActivities = await getAllActivities();
    
    res.render('deleteActivity', { allActivities });
  } catch (error) {
    res.render('error', { errorMessage: "Failed to delete activity." });
  }
});

export default activitiesRouter;
