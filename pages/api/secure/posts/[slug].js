import nextConnect from 'next-connect'
import { all } from '../../../../middlewares'
import BlogPost from '../../../../models/BlogPost'

const handler = nextConnect() //TODO: secure routing

handler.use(all)

handler.get(async (req, res) => {
  const { query: { slug } } = req

  try {
    const post = await BlogPost.findOne({ slug }).lean()
    if (!post) {
      return res.status(404).json({ success: false })
    }
    res.status(200).json({ success: true, data: post })
  } catch (error) {
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

export default handler