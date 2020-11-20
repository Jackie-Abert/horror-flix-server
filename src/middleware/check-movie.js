const movieService = require("../movies/movies-service");

function checkMovie(req, res, next) {

    movieService.getSingleMovie(req.app.get("db"), req.params.movie_id, req.user.id)
    .then((movie) => {
      if(movie) {
          req.movie = movie
          return next()
      }
      return res.status(404).json({
        error: { message: `Movie doesn't exist` }})
    })
    .catch(next);
}

module.exports = 
  checkMovie
;