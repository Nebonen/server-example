import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectUserByUsername} from '../models/userModel.js';

const login = async (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByUsername(username);
  console.log('eka logi');
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    console.log('toka logi');
    if (match) {
      console.log('kolmas logi');
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    }
  }
  res.status(401).json({message: 'Bad username/password.'});
};

const getMe = (req, res) => {
  const user = req.user;
  res.json(user);
};

export {login, getMe};
