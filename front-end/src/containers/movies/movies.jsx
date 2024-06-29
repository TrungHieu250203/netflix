import classNames from "classnames/bind";
import styles from "./movies.module.scss";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchAllMovies } from "../../api/index";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Pagination from "../../components/pagination/pagination";
import Sort from "../../components/sort/sort";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

const cx = classNames.bind(styles);

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const currentPage = parseInt(queryParams.page) || 1;
  const category = queryParams.genre || "";
  const token = Cookies.get("adminToken");
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
  const [movieId, setMovieId] = useState("");

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
      });
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
    return (
      <div className={cx("loading")}>
        <img src={"/assets/imgs/kOnzy.gif"} alt="loading" />
      </div>
    );
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/${movieId}`);
      if (response.status === 200) {
        console.log("Successfully deleted !");
        const currentMovies = movies.filter(m => m._id !== movieId);
        setMovies(currentMovies);
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className={cx("movies")}>
      <div className="row">
        <div className="col-12">
          <h3>Movies</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Link to="/admin/movies/create-movie" className={cx("form-add")}>
            <button>Create<AddBoxIcon className={cx("icon")} /></button>
          </Link>
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
      <div className="row" key={currentPage} id={cx("list")}>
        {checkMovies ? (
          <strong className={cx("warning")}>
            There are no movies in this genre/country
          </strong>
        ) : (
          movies.map((item) => {
            const {
              _id,
              slug,
              poster_url,
              name,
              origin_name,
              episode_current,
              year,
            } = item.movie;
            return (
                <div key={slug} className="col-3">
                  <div className={cx("movie-item")}>
                    <img src={poster_url} alt={origin_name} />
                    <div className={cx("title")}>
                        <h5>{name} {`(${year})`}</h5>
                        <strong>{origin_name} {`(${year})`}</strong>
                    </div>
                    <p className={cx("movie-status")}>{episode_current}</p>
                    <div className={cx("action")}>
                      <Link to={`/admin/movies/edit/${_id}`}>
                        <button><EditCalendarIcon className={cx("icon")} /></button>
                      </Link>
                      <form className={cx("form-delete")} onSubmit={handleDelete}>
                        <button type="submit" onClick={() => setMovieId(_id)}><DeleteIcon className={cx("icon")} /></button>
                      </form>
                    </div>
                  </div>
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
  );
};

export default Movies;
