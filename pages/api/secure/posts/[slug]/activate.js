import nextConnect from 'next-connect'
import { all, passport } from '../../../../../middlewares'
import { ensureAdminIsInRoles } from '../../../../../utils/secureApiRoute'
import BlogPost from '../../../../../models/BlogPost'

const handler = nextConnect().use(passport.authenticate("jwt", { session: false })).use(ensureAdminIsInRoles)

handler.use(all)

handler.put(async (req, res) => {
  const { query: { slug } } = req

  try {
    const editedProduct = await BlogPost.findOneAndUpdate({ slug }, { isActive: true }, {
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