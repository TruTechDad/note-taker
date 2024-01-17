const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = ;
  
  const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  notes.push(newNote);

  fs.writeFileSync('db/db.json', JSON.stringify(notes));

  res.json(newNote);
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
