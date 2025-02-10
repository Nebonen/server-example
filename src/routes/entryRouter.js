import express from 'express';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entryController.js';

const entryRouter = express.Router();

entryRouter.route('/').get(getEntries);

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
