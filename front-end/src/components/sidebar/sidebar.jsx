import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx("sidebar")}>
            <ul>
                <li className={cx("sidebar-item")}>
                    <Link to="/admin/dashboard">
                        <DashboardIcon className={cx("icon")} />
                        Dashboard
                    </Link>
                </li>
                <li className={cx("sidebar-item")}>
                    <Link to="/admin/movies">
                        <MovieIcon className={cx("icon")} />
                        Movies
                    </Link>
                </li>
                <li className={cx("sidebar-item")}>
                    <Link to="/admin/authorization">
                        <AssignmentIcon className={cx("icon")} />
                        Authorization
                    </Link>
                </li>
                <li className={cx("sidebar-item")}>
                    <Link to="/admin/mail">
                        <EmailIcon className={cx("icon")} />
                        Mail
                    </Link>
                </li>
                <li className={cx("sidebar-item")}>
                    <Link to="/admin/setting">
                        <SettingsIcon className={cx("icon")} />
                        Setting
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;