const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

router.get('/:file', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/" + req.params.file));
});

module.exports = router;
