import { useState, useEffect } from 'react';
import {
  Link,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import * as moviesAPI from '../../services/moviesAPI';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import Loader from '../Loader/Loader';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const searchWord =
    new URLSearchParams(location.search).get('searchQuery') ?? '';

  const onInputChange = ({ target }) => {
    setQuery(target.value);
  };

  useEffect(() => {
    searchWord &&
      moviesAPI
        .fetchFindMovie(searchWord)
        .then(({ results }) => setMovies(results));
  }, [searchWord]);

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Введите слово для поиска');
    }
    history.push({ ...location, search: `searchQuery=${query}` });
    // moviesAPI.fetchFindMovie(query).then(({ results }) => setMovies(results));
    setQuery('');
  };

  return (
    <>
      <form className={s.form} action="" onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={onInputChange}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {searchWord && !movies && <Loader />}

      {movies && (
        <ul className="moviesList">
          {movies.map(movie => (
            <Link
              to={{
                pathname: `${url}/${movie.id}`,
                state: { from: location },
              }}
              key={movie.id}
            >
              <li className={s.moviesListItem}>{movie.title}</li>
            </Link>
          ))}
        </ul>
      )}

      <Route path={`${path}:movieId`}>
        <MovieDetailsPage />
      </Route>
    </>
  );
}
