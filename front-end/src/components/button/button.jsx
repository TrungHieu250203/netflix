import classNames from "classnames/bind";
import styles from "./button.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Button = ({ path, onClick, children }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(path);
  };
  return <button className={cx("btn-modify")} onClick={handleClick}>{children}</button>;
};

export default Button;
