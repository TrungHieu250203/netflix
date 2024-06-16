import classNames from "classnames/bind";
import styles from "./hero.module.scss";
import MailBox from "../../../components/mail/mail";

const cx = classNames.bind(styles);

const Hero = () => {
    const token = localStorage.getItem("token");
    return (
        <div className={cx('hero')}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Unlimited movies, TV shows, and more</h1>
                        <p className={cx("desc")} style={{ fontSize: "2.4rem", padding: "15px 0" }}>Watch anywhere. Cancel anytime.</p>
                        <p className={cx("desc")} style={{ padding: "15px 0 20px 0" }}>Ready to watch? Enter your email or mobile number to create or restart your membership.</p>
                        { !token && <MailBox /> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;