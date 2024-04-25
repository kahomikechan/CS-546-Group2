import express from 'express';
import { createReview, getAllReviews, getReview, removeReview, updateReview } from '../data/reviews.js';

const reviewsRouter = express.Router();

// Create review
reviewsRouter.post('/createReview', async (req, res) => {
  try {
    const { rating, reviewText, reviewerId, activityId } = req.body;
    const newReview = await createReview(rating, reviewText, reviewerId, activityId);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews
reviewsRouter.get('/allReviews', async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get review
reviewsRouter.get('/review/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await getReview(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update review
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

// Remove review
reviewsRouter.delete('/deleteReview/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    await removeReview(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default reviewsRouter;
