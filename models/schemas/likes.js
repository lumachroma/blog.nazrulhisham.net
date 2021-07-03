import mongoose from 'mongoose'

const LikesSchema = new mongoose.Schema({
  key: String,
  count: Number,
})

export default LikesSchema