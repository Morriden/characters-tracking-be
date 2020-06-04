const express = require('express');
const app = express();
const Character = require('./models/Character');

app.use(require('cors')());
app.use(express.json());



module.exports = app;
