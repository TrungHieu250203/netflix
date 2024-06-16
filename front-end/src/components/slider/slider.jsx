/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./slider.module.scss";
import { Link, useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Cookies from "js-cookie";
import { useNotifications } from "../socket/socket";
import { fetchAllNotifications } from "../../api";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const ImageSlider = ({ images }) => {
  const { setNotifications } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaState, setMediaState] = useState({
    isReady: false,
    muted: true,
    videoLoaded: false,
  });
  const playerRef = useRef(null);
  const { slug } = useParams();
  const email = Cookies.get("email");
  const token = Cookies.get("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleVideoEnded = () => {
    playerRef.current.seekTo(0);
  };

  useEffect(() => {
    const handleSlideChange = () => {
      setMediaState((prev) => ({ ...prev, videoLoaded: false, isReady: false }));
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const timer = setTimeout(handleSlideChange, 50000);
    return () => clearTimeout(timer);
  }, [images.length, mediaState.isReady]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMediaState((prev) => ({ ...prev, videoLoaded: true }));
    }, 15000);

    return () => clearTimeout(timerId);
  }, [currentIndex]);

  const handleVideoReady = () => {
    setMediaState((prev) => ({ ...prev, isReady: true }));
  };

  const toggleMuted = () => {
    setMediaState((prev) => ({ ...prev, muted: !prev.muted }));
  };

  const handleAddMyList = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        userEmail: email,
        movieSlug: currentImage.slug
      }
      const response = await axios.post(
        `http://localhost:3000/api/movies/my-list/add/${slug}`,
        formData, 
        options
      );
      const notificationsResponse = await fetchAllNotifications(options);
      setNotifications(notificationsResponse.messages);
      console.log(response);
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  }

  const currentImage = images[currentIndex] || {};

  return (
    <div className={cx("slider")}>
      {images.length > 0 && (
        <div className={cx("img-slider")}>
          {!mediaState.videoLoaded ? (
            <img
              className={cx("active")}
              src={currentImage.thumbUrl || ""}
              alt={`slide ${currentIndex}`}
            />
          ) : (
            currentImage.video && (
              <ReactPlayer
                url={currentImage.video}
                width="100%"
                height="625px"
                playing={true}
                controls={false}
                muted={mediaState.muted}
                onReady={handleVideoReady}
                onEnded={handleVideoEnded}
              />
            )
          )}
          {!mediaState.videoLoaded && currentImage.name && (
            <>
              <div className={cx("desc-slider", "active")}>
                <h3>{currentImage.name}</h3>
                <p>{currentImage.content}</p>
                <div className={cx("btn-group")}>
                  <Link
                    className={cx("btn-play")}
                    to={`/movie/detail/${currentImage.slug}/tap-1`}
                  >
                    <button>
                      <PlayArrowIcon className={cx("icon")} />
                      Play
                    </button>
                  </Link>
                  <form className={cx("btn-add")} onSubmit={handleAddMyList}>
                    <input type="hidden" name="userEmail" value={email} />
                    <input type="hidden" name="movieSlug" value={slug} />
                    <button type="submit">
                      <AddIcon className={cx("icon")} />
                      My list
                    </button>
                  </form>
                </div>
              </div>
              <div className={cx("mute")} onClick={toggleMuted}>
                {mediaState.muted ? (
                  <VolumeOffIcon className={cx("icon")} />
                ) : (
                  <VolumeUpIcon className={cx("icon")} />
                )}
              </div>
              <div className={cx("age")}>
                <strong>12+</strong>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;