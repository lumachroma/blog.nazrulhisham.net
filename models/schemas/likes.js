import mongoose from 'mongoose'

const LikesSchema = new mongoose.Schema({
  key: { type: String, required: true, index: { unique: true } },
  count: { type: Number, required: true },
})

export default LikesSchema