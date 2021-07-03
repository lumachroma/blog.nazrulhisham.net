import nextConnect from 'next-connect'
import { all, passport } from '../../../../middlewares'
import User from '../../../../models/User'

const queryResultProperties = "-password -roles -_id" //model projection/select

const handler = nextConnect()

handler.use(all).use(passport.authenticate("jwt", { session: false }))

handler.get(async (req, res) => {
  const { user } = req

  if (user && user.id) {
    try {
      const userProfile = await User.findById(user.id, queryResultProperties).lean()
      if (!userProfile) {
        return res.status(404).json({ success: false })
      }
      res.status(200).json({ success: true, data: userProfile })
    } catch (error) {
      res.status(409).json({ success: false })
    }
  } else {
    res.status(400).json({ success: false })
  }
})

handler.put(async (req, res) => {
  const { user, body } = req

  if (user && user.id) {

    //ONLY update these properties 
    let updateProfile = {}
    if (body.name) { updateProfile.name = body.name }
    if (body.phone) { updateProfile.phone = body.phone }
    if (body.location) { updateProfile.location = body.location }

    try {
      const userProfile = await User.findByIdAndUpdate(user.id, updateProfile, {
        new: true,
        runValidators: true,
        select: queryResultProperties,
      })
      if (!userProfile) {
        return res.status(404).json({ success: false })
      }
      res.status(200).json({ success: true, data: userProfile })
    } catch (error) {
      res.status(409).json({ success: false })
    }
  } else {
    res.status(400).json({ success: false })
  }
})

export default handler