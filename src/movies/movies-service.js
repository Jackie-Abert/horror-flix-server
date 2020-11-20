const movieService = {
    getAllMovies(db, user_id) {
        return db
        .from('movie_table AS m')
        .select("*")
        .where('m.user_id', user_id)
    },
    getSingleMovie(db, id, user_id) {
        return db
        .from('movie_table AS m')
        .select('*')
        .where({'m.id':id, user_id})
        .first();
    },
    patchRating(db, id, rating) {
        return db('movie_table AS m')
        .where('m.id', id)
        .update(rating)
    },



//patch where only a rating can be updated
//post where a whole new movie is added
//delete on specific movies the user added a possibility or maybe just a patch

}

module.exports = movieService;