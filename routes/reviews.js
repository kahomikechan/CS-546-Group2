import express from 'express';
import { createReview, getAllReviews, getReview, removeReview, updateReview } from '../data/reviews.js';

const reviewsRouter = express.Router();

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

// Create review
reviewsRouter.post('/createReview', async (req, res) => {
  try {
    const { rating, reviewText, reviewerId, activityId } = req.body;
    const newReview = await createReview(rating, reviewText, reviewerId, activityId);
    res.render('allReviews', { newReview });
  } catch (error) {
    res.render('error', { errorMessage: "Unable to submit review." });
  }
});
reviewsRouter.get('/createReview', (req, res) => {
  res.render('createReview');
});

// Get all reviews
reviewsRouter.get('/allReviews', async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    res.render('allReviews', { allReviews });
  } catch (error) {
    res.render('error', { errorMessage: "Check back later!" });
  }
});

// Get review
reviewsRouter.get('/review/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await getReview(reviewId);
    if (!review) {
      res.render('error', { errorMessage: "Unable to find review." });
    } else {
      res.render('allReviews', { review });
    }
  } catch (error) {
    res.render('error', { errorMessage: "Unable to find review." });
  }
});

// Update review - user should be able to do this
reviewsRouter.put('/updateReview/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updatedReview = req.body; // Assuming request body contains updated review data
    await updateReview(reviewId, updatedReview);
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove review - user should be able to do this
reviewsRouter.delete('/deleteReview/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    await removeReview(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

reviewsRouter.put('/reportReview/:id', isAuthenticated, async (req, res) => {
  try {
    const reviewId = req.params.id;
    // Update the review document to set reported to true
    const reviewsCollection = await reviews();
    const result = await reviewsCollection.updateOne(
      { _id: ObjectId(reviewId) },
      { $set: { reported: true } }
    );
    if (result.modifiedCount === 0) {
      res.render('error', { errorMessage: "Unable to find review." });
    } else {
      res.status(200).json({ message: 'Review reported successfully' });
    }
  } catch (error) {

    console.error('Error reporting review:', error);
    res.render('error', { errorMessage: "Unable to report review." });
  }
});

reviewsRouter.get('/reportedReviews', isAdmin, async (req, res) => {
  try {
    const reviewsCollection = await reviews();
    const reportedReviews = await reviewsCollection.find({ reported: true }).toArray();
    
    res.render('reportedReviews', { reportedReviews });
  }
  catch {
    console.error('Error retrieving reported reviews:', error);
    res.render('error', { errorMessage: 'Failed to retrieve reported reviews' });
  }
});

export default reviewsRouter;
