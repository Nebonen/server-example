import {
  //listAllEntries,
  findEntryById,
  updateEntry,
  deleteEntryById,
  insertEntry,
  selectEntriesByUserId,
} from '../models/entryModel.js';

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const putEntry = async (req, res) => {
  const updatedEntry = await updateEntry(req.params.id, req.body);
  if (updatedEntry) {
    res.json(updatedEntry);
  } else {
    res.sendStatus(404);
  }
};

const deleteEntry = async (req, res) => {
  const deletedEntry = await deleteEntryById(req.params.id);
  if (deletedEntry) {
    res.json({message: 'Entry deleted'});
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res, next) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  try {
    await insertEntry(newEntry);
    res.status(201).json({message: 'Entry added'});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

export {getEntryById, putEntry, deleteEntry, postEntry, getEntries};
