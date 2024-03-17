
import User from '../models/userModel.js'

// Utility Functions
import { generateToken } from '../utilities/generateJWT.js'


// ---- USER CRUD CONTROLLERS ---- //

// User Create Controller
export const userCreateController = async (req, res) => {
    const { email, password } = req.body
    
    try {

        const user = await User.saveUser(email, password)
    
        return res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })

    } catch (error) {
        
        return res.status(400).json({error: error.message})
    }
}

// User Get All Controller
export const userGetAllController = async (req, res, next) => {
    try {
        const user = await User.findAllUsers(req)

        return res.status(200).json(user)
    
    } catch (error) {
        next(error)
    }
} 

// User Update Controller
export const userGetSingleController = async (req, res, next) => {

    try {

        const user = await User.getSingleUser(req)
    
        return res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

// User Update Controller
export const userUpdateController = async (req, res, next) => {
    const { email, password } = req.body

    try {

        const updatedUser = await User.updateUser(req, email, password)
    
        return res.status(201).json({ 
            message: 'User Updated',
            user: updatedUser
        })

    } catch (error) {
        next(error)
    }
}

// User Delete Controller
export const userDeleteController = async (req, res, next) => {

    try {

        await User.deleteUser(req)
    
        return res.status(200).json({ message: 'User Deleted'})

    } catch (error) {

        next(error)
    }
}