const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth');
const movieService = require("./movies-service");
const checkMovie = require('../middleware/check-movie')
const jsonBodyParser = express.json();

const movieRouter = express.Router();

movieRouter
.route('/')
.all(requireAuth)
.get((req, res, next) => {
    movieService.getAllMovies(req.app.get('db'), req.user.id)
    .then((movies) => {
        res.json(movies)
    })
    .catch(next)
})

movieRouter
.route('/:movie_id')
.get(requireAuth, checkMovie,(req, res, next) => {
    res.json(req.movie)
})

//patch where only a rating can be updated
movieRouter
.route('/:movie_id')
.patch(requireAuth, checkMovie, jsonBodyParser, (req, res, next) => {
    const { rating } = req.body;
    console.log(req.body)
    const ratingUpdate = { rating };
    movieService.patchRating(
        req.app.get('db'),
        req.params.movie_id,
        ratingUpdate
    )
    .then(numRowsAffected => {
        res.status(204).end()
    })
    .catch(next)
})

//post where a whole new movie is added
//delete on specific movies the user added a possibility or maybe just a patch
module.exports = movieRouter