import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Liking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = "<div id='likeButtonContainer'></div>";
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  // Testing 1
  // Harus menampilkan like button ketika movie belum disukai
  it('should show the like button when the movie hasn`t been liked before', async () => {
    // Inisiasi like button
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    // Memastikan bahwa button yang tampil punya atribute aria-label="like this movie"
    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  // Testing 2
  // Memastikan unlike button tidak tampil ketika movie belum disukai
  it('should not show the like button when the movie hasn`t been liked before', async () => {
    // Inisiasi like button
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    // Memastikan bahwa button yang tampil atribute aria-label TIDAK BERNILAI "like this movie"
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  // Testing 3
  // Memastikan bahwa movie dapat ditambahkan ke daftar favorite movie
  it('should be able to like the movie', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const movie = await FavoriteMovieIdb.getMovie(1);

    expect(movie).toEqual({ id: 1 });

    FavoriteMovieIdb.deleteMovie(1);
  });

  // Testing 4
  // Memastikan bahwa movie yang sudah ditambahkan ke favorite, tidak dapat ditambahkan lagi
  it('should not add a movie again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteMovieIdb.putMovie({ id: 1 });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    FavoriteMovieIdb.deleteMovie(1);
  });

  // Testing 5
  // Memastikan bahwa apabila movie id-nya 0, tidak masuk ke dalam favorite
  it('should not add a movie when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
