import {getAllUsers} from '../models/userModel.js';

// Kaikken käyttäjätietojen haku
const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

// Käyttäjän haku id:n perusteella
const getUserById = (req, res) => {
  console.log('getUserById', req.params.id);
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    const {id, username, email} = user;
    res.json({id, username, email});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// Käyttäjä lisäys / rekisteröinti
const addUser = (req, res) => {
  console.log('addUser request body', req.body);
  const {username, password, email} = req.body;
  if (username && password && email) {
    const latestId = users[users.length - 1].id;
    const newUser = {
      id: latestId + 1,
      username,
      password,
      email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added.'});
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};

// Käyttäjän muokkaus id:n perusteella
const editUser = (req, res) => {
  console.log('editUser request body', req.body);
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    res.json({message: 'User updated.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// Käyttäjän poisto id:n perusteella
const deleteUser = (req, res) => {
  console.log('deleteUser', req.params.id);
  const index = users.findIndex((user) => user.id == req.params.id);
  //console.log('index', index);
  // findIndex returns -1 if user is not found
  if (index !== -1) {
    users.splice(index, 1);
    res.json({message: 'User deleted.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// user authentication (login)
const login = (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    // TO BE FIXED: password property should never be sent to client
    res.json({message: 'login ok', user});
  } else {
    res.status(401).json({message: 'Bad username/password.'});
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser, login};
