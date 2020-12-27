import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../../services/moviesAPI';
import s from './MovieDetailsPage.module.css';
import UnknownFilmPoster from '../../img/UnknownFilmPoster.png';
import Loader from '../Loader/Loader';
// import Reviews from '../Reviews/Reviews';
// import Cast from '../Cast/Cast';
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "Reviews"*/),
);
const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "Cast"*/));

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    moviesAPI.fetchMovieDetails(movieId).then(result => {
      setMovie(result);
    });
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location.state.from);
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack}>
            &lArr; Go back
          </button>
          <div className={s.movieDetails}>
            <img
              className={s.movieImage}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                  : UnknownFilmPoster
              }
              alt={movie.title}
            />
            <div className={s.movieDescription}>
              <h1 className={s.title}>{movie.title}</h1>
              <p className={s.movieDescriptionText}>
                User score: {`${Math.round((movie.vote_average * 100) / 9.5)}%`}
              </p>
              <h2 className={s.movieDescriptionTitle}>Overview</h2>
              <p className={s.movieDescriptionText}>{movie.overview}</p>
              <h3 className={s.movieSmallTitle}>Genres</h3>
              <p className={s.movieDescriptionText}>
                {movie.genres.map(el => el.name).join(', ')}
              </p>
            </div>
          </div>
          <div className={s.movieInformation}>
            <p className={s.movieDescriptionText}>Additional information</p>

            <ul className="informationList">
              <li className="listItem">
                <Link
                  to={{
                    ...location,
                    pathname: `${url}/cast`,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li className="listItem">
                <Link
                  to={{
                    ...location,
                    pathname: `${url}/reviews`,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <Suspense fallback={<Loader />}>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
      </Suspense>
    </>
  );
}
