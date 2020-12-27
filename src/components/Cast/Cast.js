import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesAPI';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';
import unknownPersonImg from '../../img/unknown-person.gif';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieCast(movieId).then(result => setCast(result));
  }, [movieId]);

  return (
    cast && (
      <ul>
        {cast &&
          cast.cast.map(({ name, profile_path, id, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w92${profile_path}`
                    : unknownPersonImg
                }
                alt="name"
              />
              <h3 className={s.movieSmallTitle}>Name : {name}</h3>
              <p className={s.reviewText}>Character : {character}</p>
            </li>
          ))}
      </ul>
    )
  );
}
