import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env

const passportLocalStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  function (email, password, done) {
    User.findOne({ $or: [{ email: email }, { username: email }] },
      async function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: `Email ${email} not found.` })
        }
        if (!(await user.isValidPassword(password))) {
          return done(null, false, { message: `Invalid email or password.` })
        }
        return done(null, user)
      })
  }
)

const passportJwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  },
  function (jwt_payload, done) {
    if (jwt_payload) {
      return done(null, jwt_payload)
    } else {
      return done(null, false)
    }
  }
)

passport.use(passportLocalStrategy)
passport.use(passportJwtStrategy)

export default passport