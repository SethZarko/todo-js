import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

// Utility Functions
import { generateToken } from '../utilities/generateJWT.js'

// Login User
export const loginUserController = async (req, res) => {
    const {email, password} = req.body

    try {
        // Input Check
    if(!email || !password) {
        throw Error('All Fields Required')
    }

    // Check for User Email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(403)
        throw Error('Invalid Credentials')
    }
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message });
    }
}