import nextConnect from 'next-connect'
import { all } from '../../../middlewares'
import BlogPost from '../../../models/BlogPost'

const handler = nextConnect()

handler.use(all) //TODO: secure routing

handler.get(async (req, res) => {
  try {
    const posts = await BlogPost.find({}).lean()
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    // res.status(404).json({ success: false })
    res.status(404).json({ success: false, error })
  }
})

export default handler