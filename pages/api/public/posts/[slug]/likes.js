import nextConnect from 'next-connect'
import { all } from '../../../../../middlewares'
import BlogPost from '../../../../../models/BlogPost'

const { NODE_ENV } = process.env

const handler = nextConnect()

handler.use(all)

handler.get(async (req, res) => {
  const { query: { slug } } = req

  let remoteAddress = req.socket.remoteAddress
  if(NODE_ENV === 'production' && req.headers['x-real-ip']){
    remoteAddress = req.headers['x-real-ip']
  }

  try {
    const post = await BlogPost.findOne(
      { slug, isActive: true },
      { likesCount: 1, likes: { $elemMatch: { key: remoteAddress } }, _id: 0 },
    ).lean()
    if (post) {
      if (!post.likes) {
        const updatedPost = await BlogPost.findOneAndUpdate(
          { slug, isActive: true },
          { $push: { likes: { key: remoteAddress, count: 0 } } },
          {
            new: true,
            runValidators: true,
            fields: { likesCount: 1, likes: { $elemMatch: { key: remoteAddress } }, _id: 0 },
          }
        ).lean()
        if (updatedPost) {
          return res.status(200).json({ success: true, data: updatedPost })
        }
      }
      res.status(200).json({ success: true, data: post })
    } else {
      res.status(404).json({ success: false })
    }
  } catch (error) {
    // res.status(409).json({ success: false })
    res.status(409).json({ success: false, error })
  }
})

export default handler