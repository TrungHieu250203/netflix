import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import Languages from "../../components/language/language";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <p><a href="">Questions? Contact us.</a></p>
            <ul className={cx("footer-list")}>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">Investor Relations</a>
              </li>
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">Speed Test</a>
              </li>
              <li>
                <Languages />
              </li>
              <li>
                Netflix Vietnam
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={cx("footer-list")}>
              <li>
                <a href="">Help Center</a>
              </li>
              <li>
                <a href="">Jobs</a>
              </li>
              <li>
                <a href="">Cookie Preferences</a>
              </li>
              <li>
                <a href="">Legal Notices</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={cx("footer-list")}>
              <li>
                <a href="">Account</a>
              </li>
              <li>
                <a href="">Ways to Watch</a>
              </li>
              <li>
                <a href="">Corporate Information</a>
              </li>
              <li>
                <a href="">Only on Netflix</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={cx("footer-list")}>
              <li>
                <a href="">Media Center</a>
              </li>
              <li>
                <a href="">Terms of Use</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
