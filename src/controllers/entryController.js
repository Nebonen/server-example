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

const postEntry = async (req, res) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  // TODO: add try-catch
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  insertEntry(newEntry);
  res.status(201).json({message: 'Entry added.'});
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};

export {getEntryById, putEntry, deleteEntry, postEntry, getEntries};
