import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { detailFilm } from "../../api/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./detail.module.scss";
import Cookies from "js-cookie";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Alert from "../../components/alert/alert";
import Star from "../../components/star/star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNotifications } from "../../components/socket/socket";
import { fetchAllNotifications } from "../../api/index";

const cx = classNames.bind(styles);

const Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setNotifications } = useNotifications();
  const [movieData, setMovieData] = useState({
    videoUrl: "",
    episodes: [],
    movie: {},
    fileName: "",
    views: 0,
    categories: [],
    comments: [],
    commentValue: "",
    idComment: "",
    userEmail: "",
    status: "",
    totalScore: 0,
  });
  const [displayedComments, setDisplayedComments] = useState(3);
  const [isAlertSuccessfully, setIsAlertSuccessfully] = useState(false);
  const [isAlertFailed, setIsAlertFailed] = useState(false);
  const episodeContainerRef = useRef(null);
  const email = Cookies.get("email");
  const token = Cookies.get("token");
  const avatarUrl = Cookies.get("avatar");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const totalStars = 10;

  const fetchMovieData = async () => {
    try {
      const response = await detailFilm(slug, options);
      const movie = response.detail.movie;
      const episodes = response.detail.episodes[0].server_data;
      const comments = response.comments;
      const user = response.user;
      const status = response.movieStatus;
      const totalScore = response.score?.totalScore ?? 0;
      const voteQuantity = response.score?.voteQuantity ?? 0;
      let totalScoreCalculator = 0;
      if (voteQuantity !== 0) {
        totalScoreCalculator = Number.parseFloat(totalScore / voteQuantity);
      }
      setMovieData({
        videoUrl: episodes[0].link_embed,
        episodes,
        movie,
        fileName: episodes[0].filename,
        views: movie.view,
        categories: movie.category,
        comments,
        userEmail: user,
        status: status,
        totalScore: totalScoreCalculator
      });
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleEpisode = useCallback(
    (episodeIndex, fileName, linkEmbed) => {
      navigate(`/movie/detail/${slug}/tap-${episodeIndex + 1}`);
      if (linkEmbed !== movieData.videoUrl) {
        setMovieData((prev) => ({
          ...prev,
          fileName,
          videoUrl: linkEmbed,
        }));
      }
    },
    [navigate, movieData.videoUrl, slug]
  );

  const episodeList = useMemo(
    () =>
      movieData.episodes.map((episode, index) => (
        <p
          key={index}
          className={cx({
            episode: true,
            active: movieData.fileName === episode.filename,
          })}
          onClick={() =>
            handleEpisode(index, episode.filename, episode.link_embed)
          }
        >
          {episode.name}
        </p>
      )),
    [movieData.episodes, movieData.fileName, handleEpisode]
  );

  const handleScroll = (direction) => {
    if (episodeContainerRef.current) {
      const container = episodeContainerRef.current;
      const scrollAmount = direction === "left" ? -container.clientWidth / 2 : container.clientWidth / 2;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const commentForm = {
        userEmail: email,
        movieSlug: slug,
        text: movieData.commentValue
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/detail/${slug}/comment/create`,
        commentForm
      );
      console.log(response);
      await fetchMovieData();
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleDeleteComment = async (event, commentId) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/movies/detail/${slug}/comment/${commentId}`
      );
      if (response.status === 200) {
        await fetchMovieData();
      }
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleAddMyList = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        userEmail: email,
        movieSlug: slug,
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/my-list/add/${slug}`,
        formData, 
        options
      );
      if (response.status === 200) {
        setIsAlertSuccessfully(true);
        setTimeout(() => {
          setIsAlertSuccessfully(false);
        }, 3000);
        const notificationsResponse = await fetchAllNotifications(options);
        setNotifications(notificationsResponse.messages);
      } else {
        setIsAlertFailed(true);
        setTimeout(() => {
          setIsAlertFailed(false);
        }, 3000);
      }
    } catch (error) {
      setIsAlertFailed(true);
      setTimeout(() => {
        setIsAlertFailed(false);
      }, 3000);
      console.error("Registration error:", error.response);
    }
  }

  const handleRating = async (newStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/movies/detail/${slug}/status-video`,
        {
          userEmail: email,
          ratingValue: newStatus,
        },
      );
      if (response.status === 200) {
        setMovieData(prev => ({...prev, status: newStatus }));
        const notificationsResponse = await fetchAllNotifications(options);
        setNotifications(notificationsResponse.messages);
      }
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  }

  return (
    <div className={cx("detail")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {isAlertSuccessfully && (
              <Alert
                icon={<CheckCircleIcon className="fs-2" />}
                text={"Added to list successfully !"}
                name={"success"}
              />
            )}
            {isAlertFailed && (
              <Alert
                icon={<SmsFailedIcon className="fs-2" />}
                text={"Add to failure list !"}
                name={"failed"}
              />
            )}
            <h3>{movieData.fileName}</h3>
            <div className="video-player">
              {movieData.videoUrl && (
                <iframe
                  src={movieData.videoUrl}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className={cx("detail-more")}>
              <p>{movieData.movie.year}</p>
              <span>|</span>
              <p>
                {movieData.movie.episode_total} <strong>Episodes</strong>
              </p>
              <span>|</span>
              <strong className={cx("views")}><RemoveRedEyeIcon className={cx("view-icon")} /> {movieData.views}</strong>
              <form className={cx("form-add-list")} onSubmit={handleAddMyList}>
                <input type="hidden" name="movieSlug" value={slug} />
                <button type="submit">
                  <LibraryAddIcon className={cx("add-icon")} />
                </button>
              </form>
              <div className={cx("rating-box")}>
                <strong>Do you like this video?</strong>
                <div className="d-flex gap-4">
                  <input type="hidden" name="userEmail" value={email} />
                  <button
                    type="button"
                    onClick={() => {
                      handleRating("liked");
                    }}
                  >
                    <ThumbUpIcon
                      className={cx("rating-icon")}
                      style={
                        movieData.status === "liked"
                          ? { color: "var(--white-color)" }
                          : {}
                      }
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleRating("disliked");
                    }}
                  >
                    <ThumbDownIcon
                      className={cx("rating-icon")}
                      style={
                        movieData.status === "disliked"
                          ? { color: "var(--white-color)" }
                          : {}
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("total-score")}>
              <Star rating={movieData.totalScore} totalStars={totalStars} />
              <strong>{ movieData.totalScore === 0 ? "(There are no reviews yet)" : `(${Math.round(movieData.totalScore * 100) / 100} score)`}</strong>
            </div>
            <div className={cx("categories")}>
              {movieData.categories.map((item) => (
                <Link
                  key={item.id}
                  to={`/?genre=${encodeURIComponent(item.slug)}`}
                >
                  <strong>{item.name}</strong>
                </Link>
              ))}
            </div>
            <p className={cx("detail-desc")}>{movieData.movie.content}</p>
            <h4 className={cx("episodes-title")}>Episodes</h4>
            <div className={cx("episodes")}>
              {movieData.episodes.length > 14 && (
                <ChevronLeftIcon
                  className={cx("icon")}
                  onClick={() => handleScroll("left")}
                />
              )}
              <div
                className={cx("episode-container")}
                ref={episodeContainerRef}
              >
                {episodeList}
              </div>
              {movieData.episodes.length > 14 && (
                <ChevronRightIcon
                  className={cx("icon")}
                  onClick={() => handleScroll("right")}
                />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={cx("comments")}>
              <h4>Comments</h4>
              <form className={cx("user")} onSubmit={handleSubmitComment}>
                <div className={cx("comment")}>
                  <img src={`http://localhost:3000${avatarUrl}`} alt="Avatar" />
                  <textarea
                    className={cx("text")}
                    value={movieData.commentValue}
                    name="text"
                    placeholder="Post a comment..."
                    rows={7}
                    onChange={(e) =>
                      setMovieData((prev) => ({
                        ...prev,
                        commentValue: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <div className={cx("btn-group")}>
                  <button className={cx("cancel")}>Cancel</button>
                  <button type="submit" className={cx("submit")}>
                    Submit
                  </button>
                </div>
              </form>
              <div className={cx("list")}>
                {movieData.comments
                  .slice(0, displayedComments)
                  .map((comment) => {
                    return (
                      <form
                        key={comment.userId}
                        className={cx("item")}
                        onSubmit={(event) =>
                          handleDeleteComment(event, comment._id)
                        }
                      >
                        <div className={cx("comment-item")}>
                          <img src={`http://localhost:3000${comment.avatarUrl}`} alt="Avatar" />
                          <textarea
                            className={cx("text")}
                            value={comment.text}
                            disabled
                            rows={7}
                          ></textarea>
                        </div>
                        {movieData.userEmail === email && (
                          <div className={cx("btn-group")}>
                            <button>Edit</button>
                            <button type="submit">Delete</button>
                          </div>
                        )}
                      </form>
                    );
                  })}
              </div>
              {movieData.comments.length > 3 && (
                <button
                  className={cx("btn-more")}
                  style={displayedComments > 3 ? { display: "none" } : {}}
                  onClick={() =>
                    setDisplayedComments(movieData.comments.length)
                  }
                >
                  More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;