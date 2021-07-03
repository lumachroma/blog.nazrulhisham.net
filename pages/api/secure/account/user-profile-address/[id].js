import nextConnect from 'next-connect'
import { all, passport } from '../../../../../middlewares'
import User from '../../../../../models/User'

const handler = nextConnect()

handler.use(all).use(passport.authenticate('jwt', { session: false }))

handler.get(async (req, res) => {
  const { user, query: { id } } = req

  try {
    const foundProfile = await User.findOne({
      '_id': user.id,
      'addresses._id': id,
    })

    if (!foundProfile) {
      return res.status(404).json({ success: false })
    }

    const foundProfileAddress = foundProfile.addresses.id(id)
    if (!foundProfileAddress) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ success: true, data: foundProfileAddress })
  } catch (error) {
    res.status(409).json({ success: false, error })
  }
})

handler.put(async (req, res) => {
  const { user, body, query: { id } } = req

  try {
    body._id = id //ensure id is not modified
    const updatedProfile = await User.findOneAndUpdate(
      {
        '_id': user.id,
        'addresses._id': id
      },
      {
        '$set': {
          'addresses.$': body, //positional $ operator (holds the "matched" position in the array)
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
})

handler.delete(async (req, res) => {
  const { user, query: { id } } = req

  try {
    const updatedProfile = await User.findOneAndUpdate(
      {
        '_id': user.id,
        'addresses._id': id
      },
      {
        '$pull': {
          'addresses': { _id: id },
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
})

export default handler