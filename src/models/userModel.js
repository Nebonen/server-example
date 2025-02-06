import promisePool from '../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Users');
  console.log(rows);
  return rows;
};

const getUserByIdDB = async (id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM Users WHERE user_id = ?',
    [id],
  );
  console.log(rows);
  return rows[0];
};

const addUserDB = async (user) => {
  const [result] = await promisePool.query(
    'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
    [user.username, user.password, user.email],
  );
  console.log(result);
  return result.insertId;
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

export {getAllUsers, getUserByIdDB, addUserDB, updateUserDB, deleteUserDB};
