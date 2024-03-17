import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protectRoute = async (req, res, next) => {

    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
        {
            try {
                // Get Token From Header
                token = req.headers.authorization.split(' ')[1]

                // Verify Token
                const decoded = jwt.verify(token, process.env.SECRET_KEY)

                // Assign/Get User from Token to use in Application: req.user.id
                req.user = await User.findById(decoded.id).select('-password')

                next()
            } catch (error) {
                console.error(error)
                res.status(401)
                throw Error('Unauthorized')
            }
        }

        if(!token) {
            res.status(401)
            throw Error('Unauthorized')
        }
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: error.message });
    }   
}