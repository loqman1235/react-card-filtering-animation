import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import styles from "./Movie.module.scss";

const Movie = ({ movie }) => {
  return (
    <div className={styles.movie}>
      <div className={styles.moviePoster}>
        <img
          src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default Movie;
