import {
  getAllUsers,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
} from '../models/userModel.js';

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await getUserByIdDB(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Add new user / registration
const addUser = async (req, res) => {
  try {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Request should have username, password and email properties.',
      });
    }

    const newUser = await addUserDB({
      username,
      password,
      email,
    });

    res.status(201).json({
      message: 'User added.',
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Edit user by ID
const editUser = async (req, res) => {
  try {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Request should have username, password and email properties.',
      });
    }

    const updated = await updateUserDB(req.params.id, {
      username,
      password,
      email,
    });

    if (updated) {
      res.json({message: 'User updated.'});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Update deleteUser function
const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserDB(req.params.id);
    if (deleted) {
      res.json({message: 'User deleted'});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser};
