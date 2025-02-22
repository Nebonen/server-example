import promisePool from '../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Users');
  console.log(rows);
  return rows;
};

const getUserByIdDB = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id = ?',
      [userId],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const addUserDB = async (user) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email],
    );
    console.log('insert user', result);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const updateUserDB = async (id, user) => {
  const [result] = await promisePool.query(
    'UPDATE Users SET username = ?, password = ?, email = ? WHERE user_id = ?',
    [user.username, user.password, user.email, id],
  );
  return result.affectedRows > 0;
};

const deleteUserDB = async (id) => {
  const [result] = await promisePool.query(
    'DELETE FROM Users WHERE user_id = ?',
    [id],
  );
  return result.affectedRows > 0;
};

const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE username = ? AND password = ?',
      [username, password],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, created_at, user_level FROM Users WHERE username=?',
      [username],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  getAllUsers,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  selectUserByNameAndPassword,
  selectUserByUsername,
};
