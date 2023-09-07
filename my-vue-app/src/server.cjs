const express = require('express');
const movies = require('./data/kinopoisk-1.json');

const app = express();

app.get('/api/movies', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(movies)
    res.json(movies);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

