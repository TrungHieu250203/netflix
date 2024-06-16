import { fetchFeatureFilms } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

// eslint-disable-next-line react/prop-types
const FeatureFilms = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchFeatureFilms} title={"All Features"} />
    </>
  );
};

export default FeatureFilms;