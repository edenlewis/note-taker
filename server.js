const express = require("express");
const path = require("path");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
const uuid = require('./helpers/uuid')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static("public"));

// api routes
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text, 
    id: uuid()
  }
  readAndAppend(newNote, "./db/db.json");
  res.json("note created");
});

// This view route is a GET route for the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// This view route is a GET route for the homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
