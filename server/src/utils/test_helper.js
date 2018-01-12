import mongoose from 'mongoose';
import keys from '../config/keys';

function initializeTestDb() {
  
  try {
    mongoose.connect(keys.mongoUriTest, { useMongoClient: true });
  } catch (err) {
    return new Promise((res, rej) => res(false));
  }
  return new Promise((res, rej) => res(true));
}

export default initializeTestDb;