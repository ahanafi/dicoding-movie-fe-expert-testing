import { itActsAsFavoriteMovieModel } from './contract/favoriteMovieContract';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    // Memanggil semua data movie
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
      // Menghapus satu per satu movie yang tersimpan
      await FavoriteMovieIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
});
