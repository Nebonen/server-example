import {
  listAllEntries,
  findEntryById,
  updateEntry,
  deleteEntryById,
} from '../models/entryModel.js';

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

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

export {getEntries, getEntryById, putEntry, deleteEntry};
