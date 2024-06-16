import classNames from "classnames/bind";
import styles from "./ranking.module.scss";
import { fetchAllRanking } from "../../api/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const cx = classNames.bind(styles);

const Ranking = () => {
    const [ranking, setRanking] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);

    const scrollToTop = () => {
        window.scrollTo({
            top: 600,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const getRanking = async () => {
            try {
                const response = await fetchAllRanking();
                setRanking(response);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        }
        getRanking();
    }, []);

    const handlePrevPage = () => {
        setCurrentIndex((prevPage) => {
          if (prevPage === 1) {
            return Math.ceil(ranking.length / 4);
          } else {
            return Math.max(prevPage - 1, 1);
          }
        });
      };
    
      const handleNextPage = () => {
        setCurrentIndex((prevPage) => {
          if (prevPage === Math.ceil(ranking.length / 4)) {
            return 1;
          } else {
            return prevPage + 1;
          }
        });
      };
    
      const startIndex = (currentIndex - 1) * 4;
      const endIndex = Math.min(startIndex + 4, ranking.length);
      const currentMovies = ranking.slice(startIndex, endIndex);

    return (
        <div className={cx("ranking")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Ranking</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-between align-items-center">
                        <div>
                            <strong className={cx("ranking-desc")}>Movies with the highest views daily</strong>
                        </div>
                        <div className={cx("btn-group")}>
                            <button className={cx("btn-click")} onClick={handlePrevPage}>
                                <ChevronLeftIcon className={cx("icon")} />
                            </button>
                            <button className={cx("btn-click")} onClick={handleNextPage}>
                                <ChevronRightIcon className={cx("icon")} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {currentMovies.map((item) => {
                        const { name, origin_name, poster_url, slug, episode_current, year, view } = item.movie;
                        let episode = "tap-1";
                        if(episode_current.includes("Full")) {
                            episode = "tap-full";
                        }
                        return (
                            <div className="col-3" key={name}>
                                <div className={cx("movie-item")}>
                                    <Link to={`/movie/detail/${slug}/${episode}`} onClick={scrollToTop}>
                                        <div className={cx("movie-top")}>
                                            <p className={cx("movie-status")}>{episode_current}</p>
                                        </div>
                                        <LazyLoadImage src={poster_url} effect="blur" alt="Error" />
                                        <PlayCircleIcon className={cx("play-icon")} style={{ fontSize: "50px" }} />
                                        <b><RemoveRedEyeIcon className={cx("icon")} /> {view}</b>
                                        <span className={cx("triangle")}></span>
                                        <div className={cx("movie-title")}>
                                            <h5>{name} {`(${year})`}</h5>
                                            <strong>{origin_name} {`(${year})`}</strong>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Ranking;