import express from 'express';
import { searchActivity, searchEvent } from '../data/search.js';

const searchRouter = express.Router();

// Define the route handler for the /search endpoint
searchRouter.get('/allActivities/search', async (req, res) => {
    try {
        const query = req.query.searchInput;
        const activitiesResults = await searchActivity(query);
        // const eventsResults = await searchEvent(query);
        // const reviewsResults = await searchReview(query);

        // const searchResults = {
        //     activities: activitiesResults,
        //     // events: eventsResults,
        //     // reviews: reviewsResults
        // };
    
        res.render('searchResults', { searchResults: activitiesResults });
    } catch (error) {
        res.render('error', { errorMessage: "There are no items that match your search." });
    }
});

export default searchRouter;

