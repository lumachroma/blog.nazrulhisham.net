import nextConnect from 'next-connect'
import { all } from '../../../../middlewares'
import BlogPost from '../../../../models/BlogPost'

const DEFAULT_POST_LIMIT = 5

const handler = nextConnect()

handler.use(all)

handler.get(async (req, res) => {
  const { query: { limit } } = req

  try {
    const posts = await BlogPost.find()
      .sort({ likesCount: -1, _id: 1 })
      .limit(limit ? Number(limit) : DEFAULT_POST_LIMIT)
      .lean()
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(404).json({ success: false })
  }
})

export default handler