import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Hero from "../containers/home/sections/hero";
import classNames from "classnames/bind";
import styles from "./default.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className={cx("background")}>
        <Header />
        <Hero />
      </div>
      <>{children}</>
      <Footer />
    </>
  );
};

export default DefaultLayout;
