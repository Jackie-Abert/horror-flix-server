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
    postNewMovie(db, data) {
        return db
        .insert(data)
        .into('movie_table')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getAllTitles(db, user_id){
        return db
        .from('movie_table AS m')
        .select("title")
        .where('m.user_id', user_id)
        .then(rows => {
            return rows
        })
    },
    deleteMovie(db, id){
        return db('movie_table')
        .where({id})
        .delete()
    }
}

module.exports = movieService;