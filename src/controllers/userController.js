import userModel from '../model/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env


class UserController {

    addUser = async (req, res) => {
        var userData = req.body
        if (!userData.email) {
            return res.status(422).send('Email is required!!')
        }
        userData.password = await bcrypt.hash(userData.password, 10)

        let model = new userModel(userData)
        const user = await userModel.findOne({ email: userData.email })
        if (user) {
            return res.status(422).send('Email already exists')
        }
        model.save((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                const token = jwt.sign({ _id: result._id }, JWT_SECRET)
                userModel.findByIdAndUpdate(result._id, { token: token }).exec()
                delete result['password']
                res.status(201).send({ user: result, token: token })

            }
        })
    }


    login = async (req, res) => {

        try {
            const { email, password } = req.body
            if (!email) {
                return res.status(422).send('Email is required!!')
            }
            const user = await userModel.findOne({ email: email })
            if (!user) {
                return res.status(401).send('Login failed! Check authentication credentials')
            }
            const isPasswordMatch = bcrypt.compareSync(password, user.password)
            if (!isPasswordMatch) {
                return reject('Invalid Password !')
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET)
            await userModel.findByIdAndUpdate(user._id, { token: token })
            delete user['password']
            user.token=token
            console.log(user)
            res.send({ user })

        } catch (error) {
            return res.status(401).json({ token: null, message: error })
        }

    }


}
export default new UserController();
