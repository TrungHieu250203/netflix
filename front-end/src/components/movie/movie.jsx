import classNames from "classnames/bind";
import styles from "./movie.module.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Movie = ({ slug = '', poster_url = '', name = '', origin_name = '', episode_current = '', episode = '', year = '' }) => {
  return (
    <div className={cx("movie-item")}>
        <Link to={`/movie/detail/${slug}/${episode}`}>
          <LazyLoadImage src={poster_url} effect="blur" alt="Error" />
          <PlayCircleIcon className={cx("icon")} style={{ fontSize: "50px" }} />
          <div className={cx("movie-title")}>
            <h5>{name} {`(${year})`}</h5>
            <strong>{origin_name} {`(${year})`}</strong>
          </div>
          <p className={cx("movie-status")}>{episode_current}</p>
        </Link>
    </div>
  )
};

export default Movie;