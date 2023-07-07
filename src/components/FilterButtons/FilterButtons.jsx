import { useContext, useState } from "react";
import styles from "./FilterButtons.module.scss";
import { MovieContext } from "../../App";

const FilterButtons = ({ genres }) => {
  const { popularMovies, setFilteredMovies } = useContext(MovieContext);
  const [tabActive, setTabActive] = useState(0);
  const handleClickFilter = (id) => {
    setTabActive(id);
    const filteredMovies = popularMovies.filter((movie) =>
      movie.genre_ids.includes(id)
    );

    if (id === 0) {
      setFilteredMovies(popularMovies);
    } else {
      setFilteredMovies(filteredMovies);
    }
  };

  return (
    <div className={styles.filterButtons}>
      <button
        onClick={() => handleClickFilter(0)}
        className={tabActive === 0 ? styles.active : ""}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          className={tabActive === genre.id ? styles.active : ""}
          onClick={() => handleClickFilter(genre.id)}
          key={genre.id}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
