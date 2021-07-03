import nextConnect from 'next-connect'
import { all, passport } from '../../../../middlewares'
import User from '../../../../models/User'

const { MAX_ADDRESS_PER_PROFILE } = process.env

const handler = nextConnect()

handler.use(all).use(passport.authenticate('jwt', { session: false }))

handler.post(async (req, res) => {
  const { user, body } = req

  if (user && user.id) {
    try {
      const maxAddressIndex = Number(MAX_ADDRESS_PER_PROFILE) - 1
      const updatedProfile = await User.findOneAndUpdate(
        {
          '_id': user.id,
          [`addresses.${maxAddressIndex}`]: { '$exists': false },
        },
        {
          '$push': {
            'addresses': body,
          },
        },
        {
          new: true,
          runValidators: true,
          select: '-password -roles',
        },
      ).lean()

      if (!updatedProfile) {
        return res.status(500).json({ success: false })
      }

      res.status(200).json({ success: true, data: updatedProfile.addresses })
    } catch (error) {
      res.status(409).json({ success: false, error })
    }
  } else {
    res.status(400).json({ success: false })
  }
})

export default handler