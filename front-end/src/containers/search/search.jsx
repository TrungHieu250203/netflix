import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMovies } from "../../context/movie-provider";
import classNames from "classnames/bind";
import styles from "./search.module.scss";
import Movie from "../../components/movie/movie";
import Pagination from "../../components/pagination/pagination";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../api/index";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const storedKeyword = localStorage.getItem("searchKeyword") || "";
  const keyword = searchParams.get("search") || storedKeyword;
  const [countMovies, setCountMovies] = useState(0);
  const {
    movies,
    setMovies,
    currentPage,
    setCurrentPage,
    totalPagesSearch,
    setTotalPagesSearch
  } = useMovies();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const pageFromQuery = parseInt(queryParams.page) || 1;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const token = Cookies.get("token");
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = await fetchMovies(keyword, pageFromQuery, options);
        setMovies(data.movies);
        setCountMovies(data.movies.length);
        setTotalPagesSearch(data.totalPagesSearch);
        setCurrentPage(pageFromQuery);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };
    if (keyword) {
      localStorage.setItem("searchKeyword", keyword);
      loadMovies();
    }
  }, [keyword, pageFromQuery, setMovies, setCurrentPage, setTotalPagesSearch]);

  const paginate = (pageNumber) => {
    navigate(`?keyword=${encodeURIComponent(keyword)}&page=${pageNumber}`);
  };

  return (
    <div className={cx("search")}>
      <div className="container">
        <div className="row" id={cx("search-result")}>
          <h2>{`Keyword: "${keyword}"`}</h2>
          <strong>There are a total of {countMovies} results</strong>
          { movies.length === 0 && <b>Not found</b>}
          { movies.map(item => {
            const { slug, poster_url, name, origin_name, episode_current, year } = item.movie;
            let episode = "tap-1";
            if(episode_current.includes("Full")) {
              episode = "tap-full";
            }
            return (
              <div key={slug} className="col-3">
                <Movie
                  slug={slug}
                  poster_url={poster_url}
                  name={name}
                  origin_name={origin_name}
                  episode_current={episode_current}
                  episode={episode}
                  year={year}
                />
              </div>
            );
          }) }
        </div>
        <Pagination
          pages={totalPagesSearch}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SearchResult;