import express from 'express';
import { searchActivities, searchEvents, searchReviews } from '../data/search.js';

const searchRouter = express.Router;

// Define the route handler for the /search endpoint
searchRouter.get('/search', async (req, res) => {
    try {
        const query = req.query.query;

        const activitiesResults = await searchActivities(query);
        const eventsResults = await searchEvents(query);
        const reviewsResults = await searchReviews(query);

        const searchResults = {
            activities: activitiesResults,
            events: eventsResults,
            reviews: reviewsResults
        };

        res.render('searchResults', { searchResults: searchResults });
    } catch (error) {
        res.render('error', { errorMessage: "There are no items that match your search." });
    }
});

export default searchRouter;

