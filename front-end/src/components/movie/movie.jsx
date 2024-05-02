import classNames from "classnames/bind";
import styles from "./movie.module.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Movie = ({ slug, poster_url, name, origin_name, episode_current }) => {
  return (
    <div className={cx("movie-item")}>
        <Link to={`/movie/detail/${slug}`}>
          <LazyLoadImage src={poster_url} effect="blur" alt="Error" />
          <div className={cx("movie-title")}>
            <strong>{name}</strong>
            <strong>{origin_name}</strong>
          </div>
          <p className={cx("movie-status")}>{episode_current}</p>
        </Link>
    </div>
  )
};

export default Movie;