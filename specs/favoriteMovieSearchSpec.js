import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Searching movies', () => {
  let presenter;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
        <div id="movie-search-container">
            <input id="query" type="text">
            <div class="movie-result-container">
                <ul class="movies">
                </ul>
            </div>
        </div>
        `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteMovieIdb, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies: FavoriteMovieIdb,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  // Testing 1 : Ambil query yang diketik oleh user
  it('should be able to capture the query typed by the user', () => {
    searchMovies('film a');

    expect(presenter.latestQuery)
      .toEqual('film a');
  });

  // Testing 2 : Lakukan pencarian berdasarkan query user
  it('should ask the model to search for liked movies', () => {
    searchMovies('film a');

    expect(FavoriteMovieIdb.searchMovies)
      .toHaveBeenCalledWith('film a');
  });

  // Testing 3 : Tampilkan hasil pencarian
  it('should show the found movies', () => {
    presenter._showFoundMovies([
      { id: 1, title: 'Film Satu' },
      { id: 2, title: 'Film Dua' },
    ]);

    // kemudian tes film di atas ditampilkan
    const foundMovies = document.querySelectorAll('.movie');

    expect(foundMovies.length).toEqual(2);
  });

  // Testing 4 : Pencarian berdasarkan title
  it('should show the title of the found movies', () => {
    presenter._showFoundMovies([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.movie__title').item(0).textContent)
      .toEqual('Satu');

    presenter._showFoundMovies([
      { id: 1, title: 'Satu' },
      { id: 2, title: 'Dua' },
    ]);

    const movieTitles = document.querySelectorAll('.movie__title');
    expect(movieTitles.item(0).textContent).toEqual('Satu');
    expect(movieTitles.item(1).textContent).toEqual('Dua');
  });
});
