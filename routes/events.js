import express from 'express';
import { createEvent, getAllEvents, getEvent, removeEvent, updateEvent } from '../data/events.js';

const eventsRouter = express.Router();

//checks if the user is an admin
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


// /event
// route to create a new event - logged in user
eventsRouter.post('/createEvent', isAuthenticated, async (req, res) => {
  try {
    const eventData = req.body; 
    const newEvent = await createEvent(eventData);
    res.render('createEvent', {newEvent});
  } catch (error) {
    res.render('error', { errorMessage: "Unable to create an event." });
  }
});

// route to get all events - logged in user
eventsRouter.get('/allEvents', isAuthenticated, async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.render('eventlistpage', {allEvents} );
  } catch (error) {
    res.render('error', { errorMessage: "Check back later!" });
  }
});

// route to get a specific event by ID - logged in user
eventsRouter.get('/event/:id',isAuthenticated, async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await getEvent(eventId);
    if (!event) {
      res.render('error', { errorMessage: "Even doesn't exist." });
    } else {
      res.render('events', { event });
    }
  } catch (error) {
    res.render('error', { errorMessage: "Failed to load." });
  }
});

// make this so only admin can do it
// route to update an existing event - only admin 
eventsRouter.put('/updateEvent/:id', isAdmin, async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body; 
    const updatedEvent = await updateEvent(eventId, updatedEventData);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//route to delete an event - user and admin
eventsRouter.delete('/deleteEvent/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    await removeEvent(eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default eventsRouter;
