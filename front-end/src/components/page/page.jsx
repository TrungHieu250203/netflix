/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Pagination = ({ pages, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={cx("pagination")}>
        {pageNumbers.map((number) => (
          <li key={number} className={cx("page-item", { active: currentPage === number })}>
            <span onClick={() => paginate(number)} className={cx("page-link")}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
