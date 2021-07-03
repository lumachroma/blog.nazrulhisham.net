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

handler.post(async (req, res) => {
  const { body } = req
  try {
    const post = await BlogPost.create(body)
    if (!post) {
      return res.status(500).json({ success: false })
    }
    res.status(201).json({ success: true, data: post })
  } catch (error) {
    console.log(error)
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

export default handler