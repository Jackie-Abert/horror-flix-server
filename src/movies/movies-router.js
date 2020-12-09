const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const movieService = require("./movies-service");
const checkMovie = require("../middleware/check-movie");
const jsonBodyParser = express.json();
const { body } = require("express-validator");

const movieRouter = express.Router();

movieRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    movieService
      .getAllMovies(req.app.get("db"), req.user.id)
      .then((movies) => {
        res.status(200).json({ movies });
      })
      .catch(next);
  });
movieRouter
  .route("/:movie_id")
  .all(requireAuth)
  .get((req, res, next) => {
    movieService
      .getSingleMovie(req.app.get("db"), req.params.movie_id, req.user.id)
      .then((movie) => {
        res.status(200).json({ movie });
      })
      .catch(next);
  });
//patch where only a rating can be updated
movieRouter
  .route("/:movie_id")
  .patch(requireAuth, checkMovie, jsonBodyParser, (req, res, next) => {
    const { rating, watched } = req.body;
    console.log(req.body);
    const ratingUpdate = { rating, watched };
    movieService
      .patchRating(req.app.get("db"), req.params.movie_id, ratingUpdate)
      .then((numRowsAffected) => {
        res.status(201).json({ message: "Rating updated" }).end();
      })
      .catch(next);
  });
//post new movie
movieRouter
.route("/")
.post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, genre, rating = 0, watched = 0 } = req.body;
    const data = { title, genre, rating, watched };
    for (const [key, value] of Object.entries(data))
    if (value == null)
    return res.status(400).json({
        error: {message:`Missing '${key}' in request body`}
    });
    data.user_id = req.user.id
    //need to get list of titles to compare right here
    if(!title){
        return res.status(400).json({
            error: {message:`Movie already exists`}
        });
    } else {
        movieService.postNewMovie(
            req.app.get('db'),
            data
        )
        .then(movie => {
            res.status(201).json({movie});
        })
        .catch(next);
    }
})
//delete movies
movieRouter.route("/:movie_id").delete(requireAuth, (req, res, next) => {
  movieService
    .deleteMovie(req.app.get("db"), req.params.movie_id)
    .then((numRowsAffected) => {
      res.status(200).json({ message: "Movie deleted" }).end();
    })
    .catch(next);
});

module.exports = movieRouter;
