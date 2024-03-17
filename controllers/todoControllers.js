
import Todo from '../models/todoModel.js'



// ---- TODO CRUD CONTROLLERS ---- //

// Task Create Controller
export const todoCreateController = async (req, res) => {
    const { name, body } = req.body
    
    try {

        const todo = await Todo.saveTodo(req, name, body)
    
        return res.status(201).json({
            name: todo.name,
            body: todo.body,
        })

    } catch (error) {
        
        return res.status(400).json({error: error.message})
    }
}

// Task Get All Controller
export const todoGetAllController = async (req, res, next) => {
    try {
        const todo = await Todo.findAllTodos(req)

        return res.status(200).json(todo)
    
    } catch (error) {
        next(error)
    }
} 

// Task Update Controller
export const todoGetSingleController = async (req, res, next) => {

    try {

        const todo = await Todo.getSingleUser(req)
    
        return res.status(200).json(todo)

    } catch (error) {
        next(error)
    }
}

// Task Update Controller
export const todoUpdateController = async (req, res, next) => {
    const { name, body } = req.body

    try {

        const updatedTodo = await Todo.updateUser(req, name, body)
    
        return res.status(201).json({ 
            message: 'Todo Updated',
            todo: updatedTodo
        })

    } catch (error) {
        next(error)
    }
}

// Task Delete Controller
export const todoDeleteController = async (req, res, next) => {

    try {

        await Todo.deleteTodo(req)
    
        return res.status(200).json({ message: 'Todo Deleted'})

    } catch (error) {

        next(error)
    }
}