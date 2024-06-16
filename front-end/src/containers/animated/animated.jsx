import { fetchAnimated } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

// eslint-disable-next-line react/prop-types
const Animated = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAnimated} title={"All Animated"} />
    </>
  );
};

export default Animated;