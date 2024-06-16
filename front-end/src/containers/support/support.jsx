import classNames from "classnames/bind";
import styles from "./support.module.scss";

const cx = classNames.bind(styles);

const Support = () => {
    return (
        <div className={cx("support")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Support</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={cx("question-list")}>
                            <div className={cx("question-item")}>
                                <h4>Vel voluptatum molestiae non consectetur odio ea</h4>
                                <p>Ut animi velit hic nobis dolore non dolor sint in dolor asperiores aut rerum molestias. Et distinctio eius a optio facilis et cumque doloremque vel adipisci impedit. Est quibusdam autem sit neque natus sit fugiat facilis!</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>Vel voluptatum molestiae non consectetur odio ea</h4>
                                <p>Ut animi velit hic nobis dolore non dolor sint in dolor asperiores aut rerum molestias. Et distinctio eius a optio facilis et cumque doloremque vel adipisci impedit. Est quibusdam autem sit neque natus sit fugiat facilis!</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>Vel voluptatum molestiae non consectetur odio ea</h4>
                                <p>Ut animi velit hic nobis dolore non dolor sint in dolor asperiores aut rerum molestias. Et distinctio eius a optio facilis et cumque doloremque vel adipisci impedit. Est quibusdam autem sit neque natus sit fugiat facilis!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support;