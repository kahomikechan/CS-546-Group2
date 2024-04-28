import express from 'express';
import { createReview, getAllReviews, getReview, removeReview, updateReview } from '../data/reviews.js';

const reviewsRouter = express.Router();

//checks if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.render('error', { errorMessage: "Access forbidden." });
  }
};

//checks if the user is logged in/approved by admin
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render('error', { errorMessage: "You must login or register to be able to do this." });
  }
};

// Create review
reviewsRouter.post('/createReview', isAuthenticated, async (req, res) => {
  try {
    const { rating, reviewText, reviewerId, activityId } = req.body;
    const newReview = await createReview(rating, reviewText, reviewerId, activityId);
    res.render('allReviews', { newReview });
  } catch (error) {
    res.render('error', { errorMessage: "Unable to submit review." });
  }
});
reviewsRouter.get('/createReview',isAuthenticated, (req, res) => {
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
reviewsRouter.get('/review/:id', isAuthenticated, async (req, res) => {
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

// Remove review - user should be able to do this
reviewsRouter.delete('/deleteReview/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    await removeReview(reviewId);
    // res.render('report', { reviewId });
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
      res.render('report', { reviewId });
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
    res.render('error', { errorMessage: "Unable to load reported reviews." });
    res.render('error', { errorMessage: 'Failed to retrieve reported reviews' });
  }
});

export default reviewsRouter;
