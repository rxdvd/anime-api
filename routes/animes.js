const express = require("express");
const router = express.Router();

let animes = require('../data/animeData');

// GET /anime - get all anime data
router.get("/", (req, res) => {
    res.json(animes);
});

// GET /animes/random - get random anime data
router.get("/random", (req, res) => {
    let randomAnime = animes[Math.floor(Math.random() * animes.length)];
    res.json(randomAnime);
});

// GET /anime/:id - get specific anime data
router.get("/:id", (req, res) => {
    try {
        let requestedAnimeName = req.params.id;
        let matchingAnime = animes.find((anime) => anime.id == requestedAnimeName);
        if(!matchingAnime) { throw new Error(`Anime not found!`)}
        res.json(matchingAnime);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// POST /anime - create new anime entry
router.post('/', (req, res) => {
    let newAnime = { id: animes.length + 1, ...req.body };
    animes.push(newAnime);
    res.status(201).json(newAnime);
});

// PATCH /anime/:id - edit anime entry
router.patch('/:id', (req, res) => {
    // read new data from body
    let newData = req.body;
    let requestedAnimeId = req.params.id;
    let matchingAnime = animes.find((anime) => anime.id == requestedAnimeId);
    
    // update the stored animes data
    let updatedAnime = { ...matchingAnime, ...newData };
    let animeIdx = animes.indexOf(matchingAnime);
    animes = [ ...animes.slice(0, animeIdx), updatedAnime, ...animes.slice(animeIdx + 1)];
    
    res.json(updatedAnime);
});

// DELETE /anime - delete all anime data
router.delete("/", (req, res) => {
    animes = [];
    res.status(204).send("All the animes are gone :(");
});

// DELETE /anime/:id - delete single anime entry
router.delete("/:id", (req, res) => {
    animes = animes.slice(0, req.params.id).concat(animes.slice(parseInt(req.params.id) + 1));
    
    res.status(204).send();
});

module.exports = router;
