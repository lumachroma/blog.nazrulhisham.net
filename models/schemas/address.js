import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
  street1: { type: String, required: true },
  street2: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String },
  postcode: { type: String, required: true },
})

export default AddressSchema