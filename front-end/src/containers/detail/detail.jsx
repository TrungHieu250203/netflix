import { useEffect, useMemo, useState } from "react";
import { detailFilm } from "../../api/index";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./detail.module.scss";

const cx = classNames.bind(styles);

const Detail = () => {
  const { slug } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [movie, setMovie] = useState([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    detailFilm(slug)
      .then((response) => {
        setMovie(response.detail.movie);
        setEpisodes(response.detail.episodes[0].server_data);
        setVideoUrl(response.detail.episodes[0].server_data[0].link_embed);
        setFileName(response.detail.episodes[0].server_data[0].filename);
      })
      .catch((error) => console.error("Failed to fetch movie details:", error));
  }, [slug]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEpisode = (fileName, linkEmbed) => {
    if (linkEmbed !== videoUrl) { 
      setFileName(fileName);
      setVideoUrl(linkEmbed);
    }
  };
  

  const episodeList = useMemo(() => episodes.map((episode, index) => (
    <p key={index} onClick={() => handleEpisode(episode.filename, episode.link_embed)}>{episode.name}</p>
  )), [episodes, handleEpisode]);

  return (
    <div className={cx("detail")}>
        <div className="container">
          <div className="row"> 
            <div className="col-12">
              <h3>{fileName}</h3>
              <div className="video-player">
                {videoUrl && (
                  <iframe
                    src={videoUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <p className={cx("detail-desc")}>{movie.content}</p>
              <div className={cx("episodes")}>{episodeList}</div>
            </div>
          </div>
        </div>
    </div>
  )
};

export default Detail;