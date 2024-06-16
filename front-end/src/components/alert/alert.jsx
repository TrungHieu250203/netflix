import classNames from "classnames/bind";
import styles from "./alert.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Alert = ({ icon, text, name }) => {
  return (
    <div className={cx("alert-box")}>
      <strong
        style={
          name === "success"
            ? { color: "#04AA56" }
            : { color: "var(--button-color)" }
        }
      >
        {icon}
      </strong>
      <strong
        className="fs-3"
        style={
          name === "success"
            ? { color: "#04AA56" }
            : { color: "var(--button-color)" }
        }
      >
        {text}
      </strong>
    </div>
  );
};

export default Alert;
