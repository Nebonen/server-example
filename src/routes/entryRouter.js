import express from 'express';
import {body} from 'express-validator';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
  postEntry,
} from '../controllers/entryController.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {authorizeEntryOwner} from '../middlewares/authorization.js';
import {validationErrorHandler} from '../middlewares/errorHandler.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('weight').isFloat({min: 2, max: 200}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('notes').isLength({min: 0, max: 1500}).escape(),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

entryRouter
  .route('/:id')
  .get(getEntryById)
  .put(authenticateToken, authorizeEntryOwner, putEntry)
  .delete(authenticateToken, authorizeEntryOwner, deleteEntry);

export default entryRouter;
