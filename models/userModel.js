import mongoose, { Schema } from "mongoose"
import { hashPassword } from '../utilities/hashPassword.js'


const userSchmea = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Apply the hashPassword function as a pre-save hook
userSchmea.pre('save', hashPassword);


// ---- Mongoose Statics ---- //

//Save User to Database
userSchmea.statics.saveUser = async function(email, password) {
    try {

        // Input Check
        if(!email || !password) {
            throw Error('All Fields Required')
        }

        // Existing User Check
        const exists = await this.findOne({ email })

        if (exists) {
            throw Error('Email Already In Use')
        }

        // Create and Save New User
        const query = {
            email: email,
            password: password
        }

        const user = new this(query)
        await user.save()
        return user

    } catch (error) {
      throw Error(error)
    }
};

// Get All Users From Database
userSchmea.statics.findAllUsers = async function(req, res) {

    try {
        const users = await this.find({ _id: req.user.id }).select('-password')

        // Users Check
        if(users.length === 0) {
            return []
        } 

        return users

    } catch (error) {
        throw Error(error)
    }
}

// Get Single User From Database
userSchmea.statics.getSingleUser = async function(req) {

    try {

        const user = await this.findById({ _id: req.user.id }).select('-password');

        // User Check
        if (!user) {
            throw Error('User Does Not Exist');
        }

        return user;

    } catch (error) {
        throw Error(error);
    }
}


// Update User In Database
userSchmea.statics.updateUser = async function(req, email, password) {

    try {

        const user = await this.findById({ _id: req.user.id });

        // User Check
        if (!user) {
            throw Error('User Does Not Exist');
        }

        const query = {
            email: email,
            password: password
        }

        // Update User Data
        const updated = await user.set(query);
        await this.updateOne(updated);

        return updated;

    } catch (error) {
        throw Error(error);
    }
}

// Delete User From Database
userSchmea.statics.deleteUser = async function(req) {

    try {

        // Existing User Check
        const user = await this.findById({ _id: req.user.id });

        if(!user) {
            throw Error('User Does Not Exist')
        }

        await this.findByIdAndDelete(id)
        return 1

    } catch (error) {
        throw Error(error)
    }
}

const User = mongoose.model('User', userSchmea)
export default User