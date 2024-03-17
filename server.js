// Imports
import 'dotenv/config'
import express from "express"
import cors from 'cors'

// Utility Functions
import { errorHandler } from './middleware/errorHandler.js' 

// Database Import
import { connectDatabase } from './database/database.js'

// Route Imports
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
// Initialize Express App
const app = express()

// Connect Database
connectDatabase()

const corsOptions = {
    origin: [
        'http://localhost:5500',
        'https://www.getpostman.com'
    
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}

// Middleware
app.use(express.json())
app.use(cors(corsOptions))


// Routes
app.use('/api/users', userRoutes)
app.use('/api/users/auth', authRoutes)
app.use('/api/todo/', todoRoutes)

// Error Handling Middleware
app.use(errorHandler)


// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {console.log(`Server Running on Port: ${PORT}...`);});