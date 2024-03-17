import mongoose, { Schema } from "mongoose"


const todoSchmea = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// ---- Mongoose Statics ---- //

//Save Todo to Database
todoSchmea.statics.saveTodo = async function(req, name, body) {
    try {

        // Input Check
        if(!name || !body) {
            throw Error('All Fields Required')
        }

    
        // Create and Save New Todo
        const query = {
            name: name,
            body: body,
            user: req.user.id
        }

        const todo = new this(query)
        await todo.save()
        return todo
        
    } catch (error) {
      throw Error(error)
    }
};

// Get All Todos From Database
todoSchmea.statics.findAllTodos = async function(req, res) {

    try {
        const todos = await this.find({ user: req.user.id })

        // Users Check
        if(todos.length === 0) {
            return []
        } 

        return todos

    } catch (error) {
        throw Error(error)
    }
}

// Get Single Todo From Database
todoSchmea.statics.getSingleTodo = async function(req) {

    try {

        const todo = await this.findById({ user: req.user.id })

        // User Check
        if (!todo) {
            throw Error('Todo Does Not Exist');
        }

        return todo;

    } catch (error) {
        throw Error(error);
    }
}


// Update Todo In Database
todoSchmea.statics.updateTodo = async function(req, name, body) {

    try {

        const todo = await this.findById({ user: req.user.id });

        // User Check
        if (!todo) {
            throw Error('Todo Does Not Exist');
        }

        const query = {
            name: name,
            body: body
        }

        // Update User Data
        const updated = await todo.set(query);
        await this.updateOne(updated);

        return updated;

    } catch (error) {
        throw Error(error);
    }
}

// Delete Todo From Database
todoSchmea.statics.deleteTodo = async function(req) {

    try {

        // Existing Todo Check
        const todo = await this.findById({ user: req.user.id });

        if(!todo) {
            throw Error('Todo Does Not Exist')
        }

        await this.findByIdAndDelete(id)
        return 1

    } catch (error) {
        throw Error(error)
    }
}

const Todo = mongoose.model('Todo', todoSchmea)
export default Todo