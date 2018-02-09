import mongoose from 'mongoose';

const { Schema } = mongoose;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
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

// boardSchema.statics.findByUserId = function findByUserId(userId) {
//   this.findOne({ userId })
//     .then((board) => {
//       console.log(board);
//       return board;
//     });
// };

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
