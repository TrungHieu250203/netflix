import classNames from "classnames/bind";
import styles from "./authorization.module.scss";

const cx = classNames.bind(styles);

const Authorization = () => {
    return (
        <div className={cx("authorization")}>
            Authorization
        </div>
    );
}

export default Authorization;