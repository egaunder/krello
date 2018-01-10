import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  passwordHash: String
});

mongoose.model('users', userSchema);