const express = require('express');
const path = require('path');
const  {readFromFile}= require('./helpers/fsUtils')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// api routes
app.get('/api/notes', (req, res) =>{
readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
});

// This view route is a GET route for the notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This view route is a GET route for the homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
