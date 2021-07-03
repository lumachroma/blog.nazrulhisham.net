import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, JWT_TOKEN_EXPIRES_IN_DAYS } = process.env

export function generateUserToken(user) {
  try {
    let signOption = {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      expiresIn: JWT_TOKEN_EXPIRES_IN_DAYS + "d",
    }
    let secretOrKey = JWT_SECRET
    let payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      roles: user.roles,
    }

    const token = jwt.sign(payload, secretOrKey, signOption)

    return token
  } catch (error) {
    throw new Error(`Unable to generate token: ${error}`)
  }
}

export function verifyUserToken(token) {
  try {
    let secretOrKey = JWT_SECRET

    const decoded = jwt.verify(token, secretOrKey)

    let jwtUser = {
      id: decoded.id ? decoded.id : "",
      name: decoded.name ? decoded.name : "",
      email: decoded.email ? decoded.email : "",
      username: decoded.username ? decoded.username : "",
      roles: decoded.roles ? decoded.roles : [],
    }

    return jwtUser
  } catch (error) {
    throw new Error(`Unable to verify token: ${error}`)
  }
}