import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  hours: String,
  type: String,
  averageRating: {
    type: Number,
    default: 0,
  },
  accommodations: String,
  priceRange: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  link: String,
  description: String,
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;