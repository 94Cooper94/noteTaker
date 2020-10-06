// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
let notes = require("./db/db");

let { nanoid } = require("nanoid");


// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});


// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  let entry = req.body;
  entry.id = nanoid();
  notes.push(entry);
  fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) {
        throw err;
    }
    console.log("success!");
    return res.json(entry);
  });
});


// Delete Notes
app.delete("/api/notes/:id", function(req, res) {
  var noteID = req.params.id;
  console.log(noteID);
  let index = notes.map(x => {
    return x.id;
  }).indexOf(noteID);

  notes.splice(index, 1);
  fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) {
        throw err;
    }
    console.log("success!");
    return res.json(noteID);
  });

});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});