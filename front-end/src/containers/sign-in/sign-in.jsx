/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames/bind";
import styles from "./sign-in.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

const Login = () => {
  const [userData, setUserData] = useState({
    click: false,
    moreActive: false,
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userForm = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth/login`,
        userForm,
      );
      Cookies.set("token", response.data.accessToken, { expires: 1/12 });
      Cookies.set("avatar", response.data.avatarUrl, { expires: 1/12 });
      Cookies.set("email", userData.email, { expires: 1/12 });
      window.location.href ="/";
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      click: true,
      [name]: value
    }));
  };

  return (
    <div className={cx("login-page")}>
      <header className={cx("header")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <svg
                  viewBox="0 0 111 30"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="default-ltr-cache-1d568uk ev1dnif2"
                  height="40px"
                >
                  <g fill="rgb(229, 9, 20)">
                    <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className={cx("login-form")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className={cx("input-box")}>
                  <input type="text" className={cx("user-input")} name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" />
                  { userData.click && !userData.email.includes("@gmail.com") && <strong className={cx("warning")}>Invalid email, please check again</strong>}
                  <input type="password" className={cx("user-input")} name="password" value={userData.password} onChange={handleInputChange} placeholder="Password" />
                </div>
                <button className={cx("sign-in")} type="submit">Sign In</button>
                <strong className={cx("or-text")}>OR</strong>
                <button className={cx("qr-code")}>Use a Sign-In Code</button>
                <Link className={cx("forgot")} to="/forgot-password">
                  Forgot password?
                </Link>
                <div className={cx("remember")}>
                  <input type="checkbox" />
                  <strong>Remember me</strong>
                </div>
                <div className={cx("sign-up")}>
                  <p>New to Netflix?</p>
                  <Link to="/auth/register" className={cx("sign-up-link")}>
                    Sign up now
                  </Link>
                </div>
                <div className={cx("more")}>
                  <p>
                    This page is protected by Google reCAPTCHA to ensure you're
                    not a bot.
                  </p>
                  {!userData.moreActive ? (
                    <strong
                      onClick={() =>
                        setUserData((prevData) => ({
                          ...prevData,
                          moreActive: true,
                        }))
                      }
                    >
                      Learn more
                    </strong>
                    ) : (
                    <p>
                      The information collected by Google reCAPTCHA is subject
                      to the <strong>Google Privacy Policy</strong> and{" "}
                      <strong>Terms of Service</strong>, and is used for
                      providing, maintaining, and improving the reCAPTCHA
                      service and for general security purposes (it is not used
                      for personalized advertising by Google).
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
