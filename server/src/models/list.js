import mongoose from 'mongoose'

const { Schema } = mongoose

const listSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  items: [Schema.Types.ObjectId, 'items'],
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('lists', listSchema)
