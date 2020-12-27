import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesAPI';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    moviesAPI.fetchTrending().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
