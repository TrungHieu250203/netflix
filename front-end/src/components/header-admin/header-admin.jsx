import classNames from "classnames/bind";
import styles from "./header.module.scss";
import axios from "axios";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

const Header = () => {
    const token = Cookies.get("adminToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const handleLogout = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/auth/logout`,
          options
        );
        if (response.status === 200) {
          console.log("Logout successful!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const clearTokenCookie = () => {
      Cookies.remove("adminToken", { path: "/" });
      window.location.reload();
    };

    return (
        <header className={cx("header")}>
            <div className="container">
                <div className="col-12 d-flex align-items-center justify-content-between">
                    <h2>Administrator</h2>
                    { token && <form className={cx("form-logout")} onSubmit={handleLogout}>
                        <input type="hidden" name="token" value={token} />
                        <button type="submit" className={cx("log-out")} onClick={clearTokenCookie}>
                            Log out
                        </button>
                    </form> }
                </div>
            </div>
        </header>
    );
}

export default Header;