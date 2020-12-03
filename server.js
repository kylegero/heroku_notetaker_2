var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

var PORT = process.env.PORT || 3040;

var theNotes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

app.get("/api/notes", function(err, res) {
    try {
        theNotes = fs.readFileSync("Develop/db/db.json", "utf8");
        console.log("\n Natey Notetaker is here to help");
        theNotes = JSON.parse(theNotes);
    } catch (err) {
        console.log("Found an error");
        console.log(err);
    }
    res.json(theNotes);
});

app.post("/api/notes", function(req, res) {
    try {
        theNotes = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(theNotes);
        theNotes = JSON.parse(theNotes);
        req.body.id = theNotes.length;
        theNotes.push(req.body);
        theNotes = JSON.stringify(theNotes);
        fs.writeFile("./Develop/db/db.json", theNotes, "utf8", function(err) {
            if (err) throw err;
        });
        res.json(JSON.parse(theNotes));
    } catch (err) {
        throw err;
        console.error(err);
    }
});

app.delete("/api/notes/:id", function(req, res) {
    try {
        theNotes = fs.readFileSync("./Develop/db/db.json", "utf8");
        theNotes = JSON.parse(theNotes);
        theNotes = theNotes.filter(function(note) {
            return note.id != req.params.id;
        });
        theNotes = JSON.stringify(theNotes);
        fs.writeFile("./Develop/db/db.json", theNotes, "utf8", function(err) {
            if (err) throw err;
        });
        res.send(JSON.parse(theNotes));
    } catch (err) {
        throw err;
        console.log(err)
    }
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
  });

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
  });

app.listen(PORT, function() {
    console.log("We're ready to go! Head to localhost:" + PORT);
  });
