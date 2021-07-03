import nextConnect from 'next-connect'
import { all, passport } from '../../../middlewares'
import { ensureAdminIsInRoles } from '../../../utils/secureApiRoute'
import User from '../../../models/User'

const queryResultProperties = "-password"

const handler = nextConnect()

handler.use(all).use(passport.authenticate("jwt", { session: false })).use(ensureAdminIsInRoles)

handler.get(async (req, res) => {
  const { query: { page, limit } } = req

  const query = {}
  const options = {
    select: queryResultProperties,
    page: page ? page : 1,
    limit: limit ? limit : 10,
    lean: true
  }

  try {
    const users = await User.paginate(query, options)
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(404).json({ success: false })
  }
})

handler.post(async (req, res) => {
  const { body } = req

  try {
    const user = await User.create(body)
    if (!user) {
      return res.status(500).json({ success: false })
    }

    let createdUser = { ...user._doc }
    delete createdUser.password

    res.status(201).json({ success: true, data: createdUser })
  } catch (error) {
    res.status(409).json({ success: false })
  }
})

export default handler