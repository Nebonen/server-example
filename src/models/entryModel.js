// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.js';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',
      [id],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntry = async (id, entry) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE DiaryEntries SET mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE entry_id = ?',
      [entry.mood, entry.weight, entry.sleep_hours, entry.notes, id],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const deleteEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id = ?',
      [id],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllEntries, findEntryById, updateEntry, deleteEntryById};
