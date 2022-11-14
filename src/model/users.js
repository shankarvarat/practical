import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const { JWT_SECRET } = process.env

const Schema = mongoose.Schema

var userSchema = new Schema(
  {
    username: { type: String, default: null },
    email: {type: String,unique: true,required: true},
    password: { type: String, default: null },
    token: {type: String,default: null}
  },
  { timestamps: true },
)


const User = mongoose.model('user', userSchema)
export default User


