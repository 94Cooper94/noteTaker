// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");


// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("./api/notes", function(req, res) {
  return res.json(notes);
});


// Create New Notes - takes in JSON input
app.post("./api/notes", function(req, res) {
  let entry = req.params.notes;

  console.log(entry);

  for (let i = 0; i < notes.length; i++) {
    if (entry === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});