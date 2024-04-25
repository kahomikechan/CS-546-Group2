import userRoutes from './users.js';
import activitiesRouter from './activities.js';
import eventsRouter from './events.js';

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', activitiesRouter);
  app.use('/', eventsRouter);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};



export default constructorMethod;