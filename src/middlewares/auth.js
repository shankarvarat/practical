import userModel from '../model/users.js'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const { JWT_SECRET } = process.env

const verifyToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, JWT_SECRET)
        const user = await userModel.findOne({ _id: data._id, token: token })
        if (!user) {
            throw new Error()
        }
        delete user["password"]
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error:true, message: 'Not authorized to access this resource' })
    }
}
export { verifyToken }