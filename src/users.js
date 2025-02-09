const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const getUser = (req, res) => {
  console.log('getUser', req.params.id);
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

const createUser = (req, res) => {
  console.log('createUser request body', req.body);
  if (req.body.username && req.body.password && req.body.email) {
    const latestId = users[users.length - 1].id;
    const newUser = {
      id: latestId + 1,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added.'});
  }
  res.status(400);
  return res.json({message: 'Request is missing required properties.'});
};

const loginUser = (req, res) => {
  console.log('loginUser request body', req.body);
  if (req.body.username && req.body.password) {
    const user = users.find(
      (user) =>
        user.username === req.body.username &&
        user.password === req.body.password,
    );
    if (user) {
      res.status(200);
      return res.json({message: 'Login successful'});
    }
  }
  res.status(401);
  return res.json({message: 'Login failed'});
};

export {getUsers, getUser, createUser, loginUser};
