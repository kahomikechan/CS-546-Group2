import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import constructorMethod from './routes/index.js';
import session from 'express-session'
import { engine } from 'express-handlebars'
import { dirname } from 'path'
import path from 'path';
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // Or any other port you prefer

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

//Sets our app to use the handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//connect to mongodb
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json());

// app.post('/create-event', async (req, res) => {
//     const eventData = req.body;

//     try {
//         const db = client.db('eventDB');

//         const result = await db.collection('events').insertOne(eventData);

//         res.status(200).json({ message: 'Event saved successfully', insertedId: result.insertedId });
//     } catch (error) {
//         console.error('Error saving event:', error);
//         res.status(500).json({ error: 'Failed to save event' });
//     }
// });

// app.get('/random-activity', async (req, res) => {
//     try {
//         const db = client.db('database_name'); 
//         const collection = db.collection('activities');
//         const count = await collection.countDocuments();
//         const randomIndex = Math.floor(Math.random() * count);
//         const randomActivity = await collection.findOne({}, { skip: randomIndex });
//         res.json(randomActivity);
//     } catch (error) {
//         console.error('Error fetching random activity:', error);
//         res.status(500).json({ error: 'Failed to fetch random activity' });
//     }
// });
// app.get('/', async (req, res) => {
//     try {
//         // Generate a random number between 1 and 13
//         const randomIndex = Math.floor(Math.random() * 13) + 1;
//         const randomImage = `img${randomIndex}.jpeg`;
//         res.render('layouts/main', { randomImage });
//     } catch (err) {
//         console.error('Error reading images directory:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// Define the directory from which to serve static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Mount the static middleware to serve files from the public directory
app.use('/public', express.static(publicDirectoryPath));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'meow'
}));

constructorMethod(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
