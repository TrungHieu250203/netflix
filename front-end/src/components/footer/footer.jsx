import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import Languages from "../../components/language/language";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <p><Link to="">Questions? Contact us.</Link></p>
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">FAQ</Link>
              </li>
              <li>
                <Link to="">Investor Relations</Link>
              </li>
              <li>
                <Link to="">Privacy</Link>
              </li>
              <li>
                <Link to="">Speed Test</Link>
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
                <Link to="">Help Center</Link>
              </li>
              <li>
                <Link to="">Jobs</Link>
              </li>
              <li>
                <Link to="">Cookie Preferences</Link>
              </li>
              <li>
                <Link to="">Legal Notices</Link>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">Account</Link>
              </li>
              <li>
                <Link to="">Ways to Watch</Link>
              </li>
              <li>
                <Link to="">Corporate Information</Link>
              </li>
              <li>
                <Link to="">Only on Netflix</Link>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">Media Center</Link>
              </li>
              <li>
                <Link to="">Terms of Use</Link>
              </li>
              <li>
                <Link to="">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
