import mongoose from 'mongoose';

const { Schema } = mongoose;

const boardSchema = new Schema({
  name: String,
  userId: String,
  category: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('boards', boardSchema);


/**
 * boardSchema = {
 *  userId: String,
 *  name: String,
 *  category: String,
 *  created_at: String,
 *  updated_at: String
 * }
 */
