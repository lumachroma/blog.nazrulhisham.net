import nextConnect from 'next-connect'
import { all, passport } from '../../../../middlewares'
import { ensureAdminIsInRoles } from '../../../../utils/secureApiRoute'
import User from '../../../../models/User'

const handler = nextConnect()

handler.use(all).use(passport.authenticate("jwt", { session: false })).use(ensureAdminIsInRoles)

handler.get(async (req, res) => {
  const { query: { id } } = req

  try {
    const user = await User.findById(id, "-password").lean()
    if (!user) {
      return res.status(404).json({ success: false })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(409).json({ success: false })
  }
})

handler.put(async (req, res) => {
  const { query: { id }, body } = req

  try {
    if (body.password) { delete body.password }

    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      select: "-password",
    })
    if (!user) {
      return res.status(500).json({ success: false })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(409).json({ success: false })
  }
})

handler.delete(async (req, res) => {
  const { query: { id } } = req

  try {
    const deletedUser = await User.deleteOne({ _id: id })
    if (!deletedUser) {
      return res.status(500).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(409).json({ success: false })
  }
})

export default handler