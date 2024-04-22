import express from 'express';
import { createEvent, getAllEvents, getEvent, removeEvent, updateEvent } from '../data/events.js';

const router = express.Router();

// route to create a new event
router.post('/', async (req, res) => {
  try {
    const eventData = req.body; 
    const newEvent = await createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route to get all events
router.get('/', async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route to get a specific event by ID
router.get('/:id', async (req, res) => {
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

// route to update an existing event
router.put('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body; 
    const updatedEvent = await updateEvent(eventId, updatedEventData);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route to delete an event
router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    await removeEvent(eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
