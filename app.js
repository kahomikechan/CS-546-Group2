import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import session from 'express-session';

import { fileURLToPath } from 'url';
import path from 'path';

import { getUser } from './data/users.js';

//const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');


app.engine('handlebars', exphbs.engine({
  layoutsDir: __dirname + '/views',
  defaultLayout: 'main'
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  name: 'AuthState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}))

//app.use(logMiddleware);


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

