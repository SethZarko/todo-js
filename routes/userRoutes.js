import { Router } from 'express'

const router = Router()

// Controller Imports
import { userCreateController, userGetAllController, userGetSingleController, userUpdateController, userDeleteController } from '../controllers/userControllers.js'

// Authenticate Route
import { protectRoute } from '../middleware/authRoute.js';



// POST /api/users/create
router.post('/create', userCreateController);

// GET /api/users/all
router.get('/all', protectRoute, userGetAllController);

// GET /api/users/:id
router.get('/:id', protectRoute, userGetSingleController);

// PATCH /api/users/:id
router.patch('/:id', protectRoute, userUpdateController);

// DELETE /api/users/:id
router.delete('/:id', protectRoute, userDeleteController);

export default router;