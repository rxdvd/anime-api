const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// import routes
const animeRoutes = require("./routes/animes");
const demoRoutes = require("./routes/demo");
app.use('/animes', animeRoutes);
app.use('/demo', demoRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/', (req, res) => {
    res.status(405).send('Forbidden request');
});

module.exports = app;
