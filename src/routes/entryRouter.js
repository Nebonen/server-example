import express from 'express';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
  postEntry,
} from '../controllers/entryController.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken, postEntry);

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
