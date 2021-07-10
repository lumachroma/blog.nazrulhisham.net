import nextConnect from 'next-connect'
import { all } from '../../../../../middlewares'
import BlogPost from '../../../../../models/BlogPost'

const handler = nextConnect()

handler.use(all)

handler.get(async (req, res) => {
  const { query: { slug } } = req

  try {
    const post = await BlogPost.findOne(
      { slug, isActive: true },
      { hitsCount: 1, _id: 0 }
    ).lean()
    if (!post) {
      return res.status(404).json({ success: false })
    }
    res.status(200).json({ success: true, data: post })
  } catch (error) {
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

handler.put(async (req, res) => {
  const { query: { slug } } = req

  try {
    const updatedPost = await BlogPost.findOneAndUpdate(
      { slug, isActive: true },
      { $inc: { hitsCount: 1 } },
      {
        new: true,
        runValidators: true,
        fields: { hitsCount: 1, _id: 0 },
      }
    ).lean()
    if (!updatedPost) {
      return res.status(500).json({ success: false })
    }
    res.status(200).json({ success: true, data: updatedPost })
  } catch (error) {
    res.status(409).json({ success: false })
  }
})

export default handler