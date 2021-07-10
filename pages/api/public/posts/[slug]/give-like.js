import nextConnect from 'next-connect'
import { all } from '../../../../../middlewares'
import BlogPost from '../../../../../models/BlogPost'

const MAX_LIKES_HIT = 10 //TODO: move into .env

const handler = nextConnect()

handler.use(all)

handler.put(async (req, res) => {
  const { query: { slug } } = req
  const { socket: { remoteAddress } } = req

  try {
    const updatedPost = await BlogPost.findOneAndUpdate(
      { slug, isActive: true, likes: { $elemMatch: { key: remoteAddress, count: { $lt: MAX_LIKES_HIT } } } },
      { $inc: { likesCount: 1, "likes.$.count": 1 } },
      {
        new: true,
        runValidators: true,
        fields: { likesCount: 1, likes: { $elemMatch: { key: remoteAddress } }, _id: 0 },
      }
    ).lean()
    if (!updatedPost) {
      return res.status(409).json({ success: false })
    }
    res.status(200).json({ success: true, data: updatedPost })
  } catch (error) {
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

export default handler