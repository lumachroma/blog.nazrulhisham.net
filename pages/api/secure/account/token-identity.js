import nextConnect from 'next-connect'
import { all, passport } from '../../../../middlewares'

const handler = nextConnect()

handler.use(all).use(passport.authenticate("jwt", { session: false }))

handler.get((req, res) => {
  const { user } = req

  if (!user) {
    return res.status(404).json({ success: false })
  }
  res.status(200).json({ success: true, data: user })
})

export default handler