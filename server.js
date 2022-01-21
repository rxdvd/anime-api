const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/', (req, res) => {
    res.status(405).send('Forbidden request');
});

module.exports = app;
