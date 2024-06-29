import classNames from "classnames/bind";
import styles from "./movies.module.scss";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Movie from "../movie/movie";
import { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";
import Cookies from "js-cookie";
import Loading from "../loading/loading";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Movies = ({ fetchAllMovies, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const currentPage = parseInt(queryParams.page) || 1;
  const category = queryParams.genre || "";
  const token = Cookies.get("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [checkMovies, setCheckMovies] = useState(false);
  const [filters, setFilters] = useState({ category });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const preloadImages = async (movies) => {
      const promises = movies.map(async (movie) => {
        const img = new Image();
        img.src = movie.poster_url;
        await img.decode();
      });
      await Promise.all(promises);
    };
    
    preloadImages().catch((error) =>
      console.log("Error preloading images:", error)
    );

    fetchAllMovies(currentPage, filters, options)
      .then((response) => {
        setMovies(response.movies);
        setTotalPages(response.totalPages);
        setCheckMovies(response.movies.length === 0);
        setIsLoading(false);
        return preloadImages(response.movies);
      })
      .catch((error) => { 
        setIsLoading(false);
        console.error("Error fetching movies:", error);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, fetchAllMovies]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      const currentParams = { ...queryParams };
      currentParams.page = pageNumber;
      const queryStringified = queryString.stringify(currentParams);
      navigate(`?${queryStringified}`);
    }
  };

  const handleSortChange = (newFilters) => {
    setFilters(newFilters);
    paginate(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("movies")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Sort
              fetchMovies={() => fetchAllMovies(currentPage, filters, options)}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <div className="row" id={cx("movies-page")} key={currentPage}>
          {checkMovies ? (
            <strong className={cx("warning")}>There are no movies in this genre/country</strong>
          ) : (
            movies.map((item) => {
              const { slug, poster_url, name, origin_name, episode_current, year } = item.movie;
              let episode = 1;
              if(episode_current.includes("Full")) {
                episode = "full";
              }
              return (
                <div key={slug} className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12">
                  <Movie
                    slug={slug}
                    poster_url={poster_url}
                    name={name}
                    origin_name={origin_name}
                    episode_current={episode_current}
                    episode={`tap-${episode}`}
                    year={year}
                  />
                </div>
              );
            })
          )}
        </div>
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Movies;
