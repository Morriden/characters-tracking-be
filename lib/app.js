const express = require('express');
const app = express();
const Character = require('./Character');

app.use(require('cors')());
app.use(express.json());

app.post('/characters', (req, res) => {
  Character
    .create(req.body)
    .then(character => res.send(character));
});

app.get('/characters', (req, res) => {
  Character
    .find()
    .then(characters => res.send(characters));
});

app.get('/characters/:id', (req, res) => {
  Character
    .findById(req.params.id)
    .then(character => res.send(character));
});

app.patch('/characters/update/:id/:level', (req, res) => {
  Character
    .findByIdAndUpdate(req.params.id, { level: req.params.level }, { new: true })
    .then(character => res.send(character));
});

app.delete('/characters/delete/:id', (req, res) => {
  Character
    .findByIdAndDelete(req.params.id)
    .then(character => res.send(character));

});

module.exports = app;
