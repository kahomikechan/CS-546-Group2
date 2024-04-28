import express from 'express';
import { searchActivity, searchEvent } from '../data/search.js';

const searchRouter = express.Router();

// Define the route handler for the /search endpoint
searchRouter.get('/allActivities/search', async (req, res) => {
    try {
        const query = req.query.searchInput;
        const activitiesResults = await searchActivity(query);

        res.render('searchResults', { searchResults: activitiesResults });
    } catch (error) {
        res.render('error', { errorMessage: "There are no items that match your search." });
    }
});

searchRouter.get('/allEvents/search', async (req, res) => {
    try {
        
        const query = req.query.searchInput;
        const eventsResults = await searchEvent(query);

        res.render('eventSearchResults', {searchResults: eventsResults});
    }
    catch (error) {
        res.render('error', { errorMessage: "There are no items that match your search." });
    }
})

export default searchRouter;

