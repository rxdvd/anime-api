const express = require("express");
const app = express();
const cors = require('cors');
const animes = require('./data/animeData')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});


// GET /anime - get all anime data
app.get("/animes", (req, res) => {
    res.json(animes);
});

// GET /anime/:id - get specific anime data
app.get("/animes/:name", (req, res) => {
    try {
        let requestedAnimeName = req.params.name;
        let matchingAnime = animes.find((anime) => anime.name.toLowerCase() === requestedAnimeName.toLowerCase());
        if(!matchingAnime) { throw new Error(`There is no anime called ${requestedCatName} here!`)}
        res.json(matchingAnime)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

// POST /anime - create new anime entry
app.post('/animes', (req, res) => {
    let newAnime = { id: anime.length + 1, name: req.body.name };
    anime.push(newAnime);
    res.status(201).json(newAnime);
})

app.post('/', (req, res) => {
    res.status(405).send('Forbidden request');
});

// PATCH /anime/:id - edit anime entry
app.patch('/animes/:id', (req, res) => {
    // read new data from body
    let newData = req.body
    let requestedAnimeId = req.params.id;
    let matchingAnime = animes.find((anime) => anime.id === requestedAnimeId);
    
    // update the stored animes data
    let updatedAnime = { ...matchingAnime, ...newData }
    let animeIdx = animes.indexOf(matchingAnime)
    animes = [ ...animes.slice(0, animeIdx), updatedAnime, ...animes.slice(animeIdx + 1)]
    
    res.json(updatedAnime)
})

// DELETE /anime - delete all anime data
app.delete("/animes", (req, res) => {
    animes = [];
    res.status(204).send("All the animes are gone :(");
})

// DELETE /anime/:id - delete single anime entry
app.delete("/animes/:id", (req, res) => {
    let requestedAnimeId = req.params.id;
    let matchingAnime = animes.find((anime) => anime.id === requestedAnimeId);
    
    // update the stored animes data
    let animeIdx = animes.indexOf(matchingAnime)
    animes = [ ...animes.slice(0, updatedAnime - 1), ...animes.slice(animeIdx + 1)]
    
    res.json(updatedAnime)
})


module.exports = app;
