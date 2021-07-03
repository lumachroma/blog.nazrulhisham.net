import nextConnect from 'next-connect'
import { all } from '../../../../../middlewares'
import BlogPost from '../../../../../models/BlogPost'

const handler = nextConnect() //TODO: secure routing

handler.use(all)

handler.put(async (req, res) => {
  const { query: { slug } } = req

  try {
    const editedProduct = await BlogPost.findOneAndUpdate({ slug }, { isActive: false }, {
      new: true,
      runValidators: true,
    }).lean()
    if (!editedProduct) {
      return res.status(500).json({ success: false })
    }
    res.status(200).json({ success: true, data: editedProduct })
  } catch (error) {
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

export default handler