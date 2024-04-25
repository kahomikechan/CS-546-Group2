import express from 'express';
import { createEvent, getAllEvents, getEvent, removeEvent, updateEvent } from '../data/events.js';

const eventsRouter = express.Router();

// /event
// route to create a new event - logged in user
eventsRouter.post('/createEvent', async (req, res) => {
  try {
    const eventData = req.body; 
    const newEvent = await createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route to get all events - logged in user
eventsRouter.get('/allEvents', async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route to get a specific event by ID - logged in user
eventsRouter.get('/event/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await getEvent(eventId);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.json(event);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// make this so only admin can do it
// route to update an existing event - only admin 
eventsRouter.put('/updateEvent/:id', async (req, res) => {
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
