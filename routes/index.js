import userRoutes from './users.js';
import activitiesRouter from './activities.js';
import eventsRouter from './events.js';
import reviewsRouter from './reviews.js';
import searchRouter from './search.js';

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', activitiesRouter);
  app.use('/', eventsRouter);
  app.use('/', reviewsRouter);
  app.use ('/', searchRouter);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};



export default constructorMethod;