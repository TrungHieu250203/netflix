/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useMovies() {
  return useContext(MovieContext);
}

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  
  const value = {
    movies,
    setMovies,
    currentPage,
    setCurrentPage,
    totalPagesSearch,
    setTotalPagesSearch,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
