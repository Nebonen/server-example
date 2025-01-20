import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(express.json());

const data = [{id: 1, name: 'Alice'}];

// Read data endpoint
app.get('/api/data', (req, res) => {
  res.status(200).json(data);
});

// Send data to server
app.post('/api/data', (req, res) => {
  const newItem = req.body;
  if (!newItem || !newItem.name) {
    return res.status(400).json({error: 'Invalid data format'});
  }
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Delete data endpoint
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({error: 'Item not found'});
  }

  res.status(204).send();
});

// Modify data endpoint
app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = data.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({error: 'Item not found'});
  }

  res.status(200).json({message: 'Modification successful', item});
});

// Handle non-existing routes
app.use((req, res) => {
  res.status(404).json({error: 'Resource not found'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
