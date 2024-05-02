import classNames from "classnames/bind";
import styles from "./movies.module.scss";
import queryString from 'query-string';
import { useLocation, useNavigate } from "react-router-dom";
import Movie from "../../components/movie/movie";
import { useEffect, useState } from "react";
import { fetchAllMovies } from "../../api/index";
import Pagination from "../../components/page/page";
import Banner from "../../../assets/imgs/Netflix-banner-web.png";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const currentPage = parseInt(queryParams.page) || 1;

  useEffect(() => {
    const preloadImages = async (movies) => {
      const promises = movies.map(async (movie) => {
        const img = new Image();
        img.src = movie.poster_url;
        await img.decode();
      });
      await Promise.all(promises);
    };

    fetchAllMovies(currentPage)
      .then(response => {
        setMovies(response.movies);
        setTotalPages(response.totalPages);
        preloadImages(movies);
      })
      .catch(error => console.error('Error fetching movies:', error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fetchAllMovies]);

  const paginate = async (pageNumber) => {
    if (pageNumber > 0) {
      navigate(`?page=${pageNumber}`);
    }
  };
  
  return (
    <div className={cx("movies")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img src={Banner} className={cx("banner")} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>All Movies</h2>
          </div>
        </div>
        <div className="row">
          {movies.map((item, index) => {
            const { slug, poster_url, name, origin_name, episode_current } = item.movie;
            return (
              <div key={index} className="col-3">
                <Movie slug={slug} poster_url={poster_url} name={name} origin_name={origin_name} episode_current={episode_current} />
              </div>
            );
          })}
        </div>
        <Pagination pages={totalPages} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  )
};

export default Movies;