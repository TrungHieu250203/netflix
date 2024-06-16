import { fetchTVShows } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

// eslint-disable-next-line react/prop-types
const TVShows = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchTVShows} title={"All TV Shows"} />
    </>
  );
};

export default TVShows;