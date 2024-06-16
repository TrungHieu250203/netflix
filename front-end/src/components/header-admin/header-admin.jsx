import classNames from "classnames/bind";
import styles from "./header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx("header")}>
            <div className="container">
                <div className="col-12">
                    <h2>Administrator</h2>
                </div>
            </div>
        </header>
    );
}

export default Header;