/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import styles from "./pagination.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const Pagination = ({ pages, currentPage, paginate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pageNumbers = [];
  const maxPageButtons = 5;
  const sideButtons = 2;

  const handlePageClick = (number) => {
    setIsLoading(true);
    paginate(number);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const renderPageNumbers = () => {
    if (pages <= maxPageButtons) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= maxPageButtons - sideButtons) {
      pageNumbers.push(...[...Array(maxPageButtons).keys()].map((i) => i + 1));
      pageNumbers.push("...", pages);
    } else if (currentPage >= pages - (maxPageButtons - sideButtons) + 1) {
      pageNumbers.push(1, "...");
      pageNumbers.push(
        ...[...Array(maxPageButtons).keys()].map((i) => pages - (maxPageButtons - 1) + i)
      );
    } else {
      pageNumbers.push(1, "...");
      for (let i = currentPage - sideButtons; i <= currentPage + sideButtons; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", pages);
    }
  };

  renderPageNumbers();

  return (
    <nav className={cx("nav-pagination")}>
      <ul className={cx("pagination")}>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={cx("page-item", { active: number === currentPage })}
          >
            {typeof number === "number" ? (
              <span
                onClick={() => handlePageClick(number)}
                className={cx("page-link")}
              >
                {number}
              </span>
            ) : (
              <span className={cx("page-link", "ellipsis")}>{number}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
