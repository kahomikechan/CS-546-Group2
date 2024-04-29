// 2 users - register another one during walkthrough
// admin user
// 3 activities - 2 reviews each
// 2 events - create third one during walkthrough - 3 reviews each
import { MongoClient, ObjectId } from 'mongodb';
import  bcrypt  from 'bcryptjs';

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    emailAddress: "john@example.com",
    username: "John1234!",
    password: await bcrypt.hash("Password123!", 10),
    isAdminApproved: "true",
    reviews: [],
    role: "admin"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    emailAddress: "jane@example.com",
    username: "Jane1234!",
    password: await bcrypt.hash("Password456!", 10),
    isAdminApproved: "true",
    reviews: [],
    role: "user"
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
    activityPriceRange: "0",
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
    activityAccommodations: "Family Bathrooms, Stroller Accessible",
    activityPriceRange: "0",
    reviews: [], 
    activityLink: "http://hobokennj.gov/",
    activityDescription: "Small, shady neighborhood spot with basketball court, playground & dog-friendly paths."
  },
    {
    activityName: "Church Square Park Playground",
    activityAddress: "211 4th St, Hoboken, NJ 07030",
    activityHours: "6am - 10pm",
    activityType: "Playground",
    rating: [],
    activityAccommodations: "Family Bathrooms",
    activityPriceRange: "0",
    reviews: [], 
    activityLink: "https://www.hobokennj.gov/location/church-square-park",
    activityDescription: "Modern playground located in Church Square Park"
  },
    {
    activityName: "Il Tavolo di Palmisano",
    activityAddress: "700 Clinton St, Hoboken, NJ 07030",
    activityHours: "4 - 10pm",
    activityType: "Restaurant",
    rating: [],
    activityAccommodations: "Stroller Accessible",
    activityPriceRange: "40",
    reviews: [], 
    activityLink: "https://iltavolohoboken.com/",
    activityDescription: "Italian meals, cocktails & weekend brunch in a rustic-chic, brick-lined dining room with a patio."
  },
    {
    activityName: "Hoboken Clique",
    activityAddress: "1204 Washington St, Hoboken, NJ 07030",
    activityHours: "10am - 6pm",
    activityType: "Store",
    rating: [],
    activityAccommodations: "Family Bathrooms, Stroller Accessible",
    activityPriceRange: "30",
    reviews: [], 
    activityLink: "https://hobokenclique.com/",
    activityDescription: "Unisex baby through tween clothing, accessories and gift shop offering customization of a variety of items."
  },
];

const events = [
  {
    eventName: "Summer Fair",
    eventAddress: "1 Castle Point Terrace, Hoboken, NJ 07030",
    eventDescription: "Carnival games, food trucks, and vendors.",
    eventDate: "06/02/2024",
    time: "11am - 10pm",
    eventContact: "carnival@example.com",
    eventType: "Fair",
    eventAccommodations: "Family Bathrooms",
    eventPriceRange: "40",
    participants: [] 
  },
  {
    eventName: "Playground Date",
    eventAddress: "11th Sinatra Dr N, Hoboken, NJ 07030",
    eventDescription: "Playground date for kids. All ages welcome",
    eventDate: "06/01/2024",
    time: "2pm - 5pm",
    eventContact: "playdate@example.com",
    eventType: "Playdate",
    eventAccommodations: "Family Bathrooms",
    eventPriceRange: "0",
    participants: [] 
  },
];

/*
const reviews = [
  {
    rating: 4,
    reviewText: "Great park for the kids!",
    reviewerId: new ObjectId(), // Insert the ObjectId of the user who left the review
    activityId: new ObjectId(), // Insert the ObjectId of the activity being reviewed
    reported: false
  },
  {
    rating: 5,
    reviewText: "Nice area for walks. The whole family had a great time",
    reviewerId: new ObjectId(),
    activityId: new ObjectId(),
    reported: true
  },
];
*/
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
