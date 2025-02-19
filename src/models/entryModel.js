import promisePool from '../utils/database.js';

//const listAllEntries = async () => {
//  try {
//    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
//    console.log('rows', rows);
//    return rows;
//  } catch (e) {
//    console.error('error', e.message);
//    return {error: e.message};
//  }
//};

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

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [
        entry.user_id,
        entry.entry_date,
        entry.mood,
        entry.weight,
        entry.sleep_hours,
        entry.notes,
      ],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  //listAllEntries,
  findEntryById,
  updateEntry,
  deleteEntryById,
  insertEntry,
  selectEntriesByUserId,
};
