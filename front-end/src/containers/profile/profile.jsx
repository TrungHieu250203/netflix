import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import { getMyProfile } from "../../api";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DragonImg from "/assets/imgs/dragon.gif";
import Silver from "/assets/imgs/Silver-Icon.png";
import axios from "axios";

const cx = classNames.bind(styles);

const Profile = () => {
    const [profile, setProfile] = useState({});
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const token = Cookies.get("token");
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const email = Cookies.get("email");
    const [state, setState] = useState({
        name: "",
        email: email,
        nameClick: false,
        emailClick: false,
    });

    useEffect(() => {
        const getProfile = async () => {
            const response = await getMyProfile(options);
            setProfile(response);
            setState((prev) => ({...prev, name: response.name }));
        }
        getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleNameEdit = () => {
        setState(prevState => ({ ...prevState, nameClick: !prevState.nameClick }));
    };

    const toggleEmailEdit = () => {
        setState(prevState => ({ ...prevState, emailClick: !prevState.emailKick }));
    };

    const cancelEdit = () => {
        setState(prevState => ({ ...prevState, emailClick: false, nameClick: false }));
    }

    const handleNameChange = (e) => {
        setState(prevState => ({ ...prevState, name: e.target.value }));
    };

    const handleEmailChange = (e) => {
        setState(prevState => ({ ...prevState, email: e.target.value }));
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const userName = nameInputRef.current.value;
            const userEmail = emailInputRef.current.value;
            const response = await axios.patch("http://localhost:3000/api/users/profile/edit", {
                userName: userName,
                userEmail: userEmail
            }, options);
            if(response.status === 200) {
                console.log("Successfully updated !");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className={cx("profile")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>My Profile</h2>
                    </div>
                </div>
                <div className="row">
                    <div className={cx("col-4 profile-custom")}>
                        <div className={cx("profile-img")}>
                            <img src={`http://localhost:3000${profile.avatar}`} alt="avatar" />
                            <div className={cx("classify")}>
                                <img src={Silver} alt="rank" />
                                <strong>VIP Account</strong>
                            </div>
                        </div>
                        <div className={cx("profile-inf")}>
                            <span className={cx("profile-text")}>
                                <input ref={nameInputRef} type="text" value={state.name} disabled={!state.nameClick} onChange={handleNameChange} className={cx("profile-input")} />
                                <EditIcon className={cx("icon")} onClick={toggleNameEdit} />
                            </span> 
                            <span className={cx("profile-text")}>
                                <input ref={emailInputRef} type="text" value={state.email} disabled={!state.emailClick} onChange={handleEmailChange}className={cx("profile-input")} />
                                <EditIcon className={cx("icon")} onClick={toggleEmailEdit} />
                            </span>
                            <form className={cx("d-flex gap-4 mt-5")} onSubmit={handleEdit}>
                                <button className={cx("btn-cancel")} onClick={cancelEdit} type="button">Cancel</button>
                                <button className={cx("btn-save")} type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className={cx("dragon-fly")}>
                            <img src={DragonImg} alt="dragon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;