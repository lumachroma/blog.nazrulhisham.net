import nextConnect from 'next-connect'
import { all, passport } from '../../../../middlewares'
import { generateUserToken } from '../../../../lib/token-service'

const handler = nextConnect()

handler.use(all)

handler.post(passport.authenticate('local', { session: false }), (req, res, next) => {
  try {
    let user = req.user
    let token = generateUserToken(user)
    let response = {
      token: token,
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      roles: user.roles
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

export default handler