import classNames from "classnames/bind";
import styles from "./download.module.scss";
import Smartphone from "/assets/imgs/mobile-0819.jpg";
import Movie from "/assets/imgs/boxshot.png";
import Icon from "/assets/imgs/download-icon.gif";

const cx = classNames.bind(styles);

const Download = () => {
  return (
    <div className={cx("download")}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className={cx("download-left")}>
                <img src={Smartphone} alt="Error" />
                <div className={cx("download-box")}>
                    <img src={Movie} alt="Error" width={60}/>
                    <div className={cx("download-desc")}>
                        <h5>Stranger Things</h5>
                        <strong>Downloading...</strong>
                    </div>
                    <img src={Icon} alt="Error" width={40} />
                </div>
            </div>
          </div>
          <div className="col-6">
            <div className={cx("download-right")}>
              <h2>Download your shows to watch offline</h2>
              <p className="pt-3">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
