const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth');
const moviesService = require("./movies-service");
const checkMovie = require('../middleware/check-movie')
const jsonBodyParser = express.json();

const moviesRouter = express.Router();

moviesRouter
.route('/')
.all(requireAuth)
.get((req, res, next) => {
    moviesService.getAllMovies(req.app.get('db'), req.user.id)
    .then((movies) => {
        res.json(movies)
    })
    .catch(next)
})

moviesRouter
.route('/:movie_id')
.get(requireAuth, checkMovie,(req, res, next) => {
    res.json(req.movie)
})
//patch where only a rating can be updated
//post where a whole new movie is added
//delete on specific movies the user added a possibility or maybe just a patch
module.exports = moviesRouter