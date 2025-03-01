import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import {
  getAllUsers,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
} from '../models/userModel.js';
import {customError} from '../middlewares/errorHandler.js';

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
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await getUserByIdDB(req.params.id);
    console.log('User found:', user);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    //res.status(500).json({message: error.message});
    next(error);
  }
};

const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  try {
    const result = await addUserDB(newUser);
    res.status(201);
    return res.json({message: 'User added. id: ' + result});
  } catch (error) {
    return next(customError(error.message, 400));
  }
};

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
