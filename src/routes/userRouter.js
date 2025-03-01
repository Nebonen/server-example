import express from 'express';
import {body} from 'express-validator';
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
userRouter
  .route('/')
  .get(authenticateToken, getUsers)
  .post(
    body('username').trim().isLength({min: 3}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    body('email').trim().isEmail(),
    addUser,
  );

// all routes to /api/users/:id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, authorizeUser, editUser)
  .delete(authenticateToken, authorizeUser, deleteUser);

export default userRouter;
