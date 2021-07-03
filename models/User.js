import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import bcrypt from 'bcryptjs'
import AddressSchema from './schemas/address'

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS

const hashUserPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(Number(BCRYPT_SALT_ROUNDS))
  const hash = bcrypt.hashSync(userPassword, salt)
  return hash
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  roles: [String],
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: String,
  addresses: [AddressSchema],
}, { strict: false, timestamps: true })

UserSchema.plugin(mongoosePaginate)

UserSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = hashUserPassword(user.password)
    return next()
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
}

UserSchema.methods.hashPassword = function (userPassword) {
  return hashUserPassword(userPassword)
}

export default mongoose.models.User || mongoose.model('User', UserSchema)