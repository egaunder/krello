import mongoose from 'mongoose'

const { Schema } = mongoose

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('items', itemSchema)
