import { createContext, useState } from "react";

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopularMovies = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    console.log(data);
    setPopularMovies(data.results);
    setLoading(false);
  };
  return (
    <MovieContext.Provider value={{ popularMovies, getPopularMovies, loading }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieContextProvider };
