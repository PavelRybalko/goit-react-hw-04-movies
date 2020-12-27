import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as moviesAPI from '../../services/moviesAPI';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';

export default function Reviews() {
  const [review, setReview] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(result => {
      setReview(result);
    });
  }, [movieId]);

  return review && !review.total_pages ? (
    <p className={s.movieDescriptionText}>
      We don't have an reviews for this movie
    </p>
  ) : (
    <ul>
      {review &&
        review.results.map(({ author, content, id }) => (
          <li key={id}>
            <h3 className={s.movieSmallTitle}>Author : {author}</h3>
            <p className={s.reviewText}>{content}</p>
          </li>
        ))}
    </ul>
  );
}
