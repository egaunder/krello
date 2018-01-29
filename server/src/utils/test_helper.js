import mongoose from 'mongoose';
import keys from '../config/keys';

mongoose.Promise = global.Promise;

export function initializeTestDb() {
  try {
    mongoose.connect(keys.mongoUriTest, { useMongoClient: true });
    return new Promise(res => res(true));
  } catch (err) {
    return new Promise(res => res(false));
  }
}


export function clearTestDb() {
  try {
    mongoose.connection.db.dropDatabase();
    return new Promise(res => res(true));
  } catch (err) {
    return new Promise(res => res(false));
  }
}
