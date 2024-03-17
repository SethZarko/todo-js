import { Router } from 'express'

const router = Router()

// Controller Imports
import { loginUserController } from '../controllers/authControllers.js'

// POST /api/users/auth/login
router.post('/login', loginUserController)


export default router