import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventTime: { type: String, required: true },
    eventLocation: { type: String, required: true },
    externalLink: { type: String }
});

const Event = mongoose.model('Event', eventSchema);

export { Event };