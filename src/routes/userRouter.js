import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/userController.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {authorizeUser} from '../middlewares/authorization.js';

const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/').get(getUsers).post(addUser);

// all routes to /api/users/:id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, authorizeUser, editUser)
  .delete(authenticateToken, authorizeUser, deleteUser);

export default userRouter;
