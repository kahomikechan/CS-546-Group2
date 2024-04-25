// 2 users - register another one during walkthrough
// admin user
// 3 activities - 2 reviews each
// 2 events - create third one during walkthrough - 3 reviews each
import { MongoClient } from 'mongodb';

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    username: "john123",
    password: "Password123!"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    username: "jane123",
    password: "Password456!"
  },
];

const activities = [
  {
    activityName: "Maxwell Place Park",
    activityAddress: "11th Sinatra Dr N, Hoboken, NJ 07030",
    activityHours: "24hours",
    activityType: "Park",
    rating: [],
    activityAccommodations: "Family Bathrooms",
    activityPriceRange: "$",
    reviews: [], 
    activityLink: "https://www.hobokennj.gov/location/maxwell-place-park",
    activityDescription: "Compact green space on the Hudson River with a waterfront walkway & beach area, plus a playground."
  },
  {
    activityName: "Elysian Park",
    activityAddress: "1001 Hudson St, Hoboken, NJ 07030",
    activityHours: "24hours",
    activityType: "Park",
    rating: [],
    activityAccommodations: "Family Bathrooms, Wheelchair accessible",
    activityPriceRange: "$",
    reviews: [], 
    activityLink: "http://hobokennj.gov/",
    activityDescription: "Small, shady neighborhood spot with basketball court, playground & dog-friendly paths."
  },
];

const events = [
  {
    eventName: "Summer Fair",
    eventAddress: "1 Castle Point Terrace, Hoboken, NJ 07030",
    eventDescription: "Carnival games, food trucks, and vendors.",
    time: "11am - 10pm",
    eventContact: "carnival@example.com",
    eventType: "Fair",
    eventAccommodations: "Family Bathrooms",
    eventPriceRange: "$$$",
    participants: [] 
  },
  {
    eventName: "Playground Date",
    eventAddress: "11th Sinatra Dr N, Hoboken, NJ 07030",
    eventDescription: "Playground date for kids. All ages welcome",
    time: "2pm - 5pm",
    eventContact: "playdate@example.com",
    eventType: "Playdate",
    eventAccommodations: "Family Bathrooms",
    eventPriceRange: "$",
    participants: [] 
  },
];

const reviews = [
  {
    rating: 4.5,
    reviewText: "Great park for the kids!",
    reviewerId: ObjectId(), // Insert the ObjectId of the user who left the review
    activityId: ObjectId() // Insert the ObjectId of the activity being reviewed
  },
  {
    rating: 4.8,
    reviewText: "Nice area for walks. The whole family had a great time",
    reviewerId: ObjectId(),
    activityId: ObjectId() 
  },
];

const uri = 'mongodb://localhost:27017'; 

const dbName = 'CS546_Group2_Final_Project'; 

async function seedDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);

    await db.collection('users').insertMany(users);
    await db.collection('activities').insertMany(activities);
    await db.collection('events').insertMany(events);
    await db.collection('reviews').insertMany(reviews);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
