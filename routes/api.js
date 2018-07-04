const express = require('express');
const router = express.Router();
const Database = require('../classes/Database');
const db = new Database();

router.get('/', (req, res) => {
    res.json({
        possibleRoutes: [
            '/get/',
            '/get/:word',
            '/post/:word',
        ],
    });
});


router.get('/get/', (req, res) => {
    db.query(`SELECT * from words`)
        .then(result => res.json(result));
});

router.get('/get/:word', (req, res) => {
    db.query(`SELECT * FROM words WHERE word LIKE '%${req.params.word}%'`)
        .then(result => res.json(result));
});

router.get('/post/:word', (req, res) => {
    db.query(`INSERT INTO words (Word) VALUES ('${req.params.word}')`)
        .then(result => res.json(result));
});

module.exports = router;