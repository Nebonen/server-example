import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import entryRouter from './routes/entryRouter.js';
import authRouter from './routes/authRouter.js';
import {errorHandler, notFoundHandler} from './middlewares/errorHandler.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(cors());

// Staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use('/', express.static('public'));

// middleware, joka lukee json data POST-pyyntöjen rungosta (body)
app.use(express.json());

// rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö apin juureen havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});

// users resurssin päätepisteet (endpoint)
app.use('/api/users', userRouter);
// käyttäjän autentikointiin liittyvät päätepisteet (endpoint)
app.use('/api/auth', authRouter);
// entry resurssin päätepisteet (endpoint)
app.use('/api/entries', entryRouter);

// virheiden käsittely
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
