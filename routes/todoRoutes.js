import { Router } from 'express'

const router = Router()

// Controller Imports
import { todoCreateController, todoGetAllController, todoGetSingleController, todoUpdateController, todoDeleteController } from '../controllers/todoControllers.js'

// Authenticate Route
import { protectRoute } from '../middleware/authRoute.js';

// POST /api/todo/create
router.post('/create', protectRoute, todoCreateController);

// GET /api/todo/all
router.get('/all', protectRoute, todoGetAllController);

// GET /api/todo/:id
router.get('/:id', protectRoute, todoGetSingleController);

// PATCH /api/todo/:id
router.patch('/:id', protectRoute, todoUpdateController);

// DELETE /api/todo/:id
router.delete('/:id', protectRoute, todoDeleteController);

export default router;