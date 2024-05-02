import classNames from "classnames/bind";
import styles from "./multi-device.module.scss";
import TVImages from "../../../../assets/imgs/tv.png";
import Video from "../../../../assets/videos/video-tv-0819.m4v";

const cx = classNames.bind(styles);

const MultiDevice = () => {
  return (
    <div className={cx("device")}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className={cx("device-left")}>
              <h2>Enjoy on your TV</h2>
              <p className="pt-3">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className={cx("device-right")}>
              <img src={TVImages} alt="Error" />
              <video autoPlay muted loop width={465}>
                <source src={Video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiDevice;
