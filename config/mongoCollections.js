import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

//Exporting collection functions
export const activities = getCollectionFn('activities');
export const events = getCollectionFn('events');
export const users = getCollectionFn('users');


export const reviews = getCollectionFn('reviews');
