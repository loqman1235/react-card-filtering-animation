import { createContext, useEffect, useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import Movie from "./components/Movie/Movie";
import { AnimatePresence, motion } from "framer-motion";

export const MovieContext = createContext();

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getLatest();
  }, []);

  useEffect(() => {
    getGenres();
  }, []);

  const getLatest = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    console.log(data);
    setPopularMovies(data.results);
    setLoading(false);
  };

  const getGenres = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
`);
    const data = await response.json();
    setGenres(data.genres);
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <MovieContext.Provider value={{ popularMovies, setFilteredMovies }}>
        <FilterButtons genres={genres} />
        {/* Movies */}
        <motion.div
          className="movies"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <Movie movie={movie} />
              </motion.div>
            ))
          )}
        </motion.div>
      </MovieContext.Provider>
    </>
  );
}

export default App;
