import { fetchAllMovies } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

// eslint-disable-next-line react/prop-types
const AllMovies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAllMovies} title={"All Movies"} />
    </>
  );
};

export default AllMovies;