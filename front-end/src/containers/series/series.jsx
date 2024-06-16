import { fetchSeries } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

// eslint-disable-next-line react/prop-types
const Movies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchSeries} title={"All Series"} />
    </>
  );
};

export default Movies;
