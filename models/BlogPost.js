import mongoose from 'mongoose'
import LikesSchema from './schemas/likes'

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, index: { unique: true } },
  title: { type: String, required: true },
  layout: String,
  tags: [String],
  description: String,
  author: String,
  posted: Date,
  likes: [LikesSchema],
  likesCount: { type: Number, default: 0 },
  hitsCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { strict: false, timestamps: true })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)