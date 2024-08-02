import React from "react";
import RightArrow1 from "/icons/right-arrow-1.svg";
import RightArrow2 from "/icons/right-arrow-2.svg";
import LeftArrow1 from "/icons/left-arrow-1.svg";
import LeftArrow2 from "/icons/left-arrow-2.svg";
import RightArrowBlack1 from "/icons/right-black-arrow-1.svg";
import RightArrowBlack2 from "/icons/right-black-arrow-2.svg";
import LeftArrowBlack1 from "/icons/left-black-arrow-1.svg";
import LeftArrowBlack2 from "/icons/left-black-arrow-2.svg";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 5;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const getPaginationNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const buttonClass =
    "pagination-button bg-white border border-slate-300 rounded-md p-1.5";
  const disabledClass = "bg-slate-400 opacity-50 cursor-not-allowed";

  return (
    <div className="pagination flex justify-end items-center gap-2 absolute bottom-[1rem] right-[2.3rem] ">
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${buttonClass} ${currentPage === 1 ? disabledClass : ""}`}
        >
          <img
            src={currentPage === 1 ? LeftArrow2 : LeftArrowBlack2}
            alt="First Page"
          />
        </button>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${buttonClass} ${currentPage === 1 ? disabledClass : ""}`}
        >
          <img
            src={currentPage === 1 ? LeftArrow1 : LeftArrowBlack1}
            alt="Previous Page"
          />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {getPaginationNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              className={`current-page w-[26px] h-[26px] rounded-md text-xs ${
                page === currentPage
                  ? "bg-custom-green-1 text-white"
                  : "bg-white text-black border border-slate-300"
              }`}
            >
              {page}
            </button>
          ) : (
            <p
              key={index}
              className="current-page p-2 rounded-md bg-white w-[26px] h-[26px] border border-slate-300 flex justify-center items-center text-xs"
            >
              {page}
            </p>
          )
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${buttonClass} ${
            currentPage === totalPages ? disabledClass : ""
          }`}
        >
          <img
            src={currentPage === totalPages ? RightArrow1 : RightArrowBlack1}
            alt="Next Page"
          />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${buttonClass} ${
            currentPage === totalPages ? disabledClass : ""
          }`}
        >
          <img
            src={currentPage === totalPages ? RightArrow2 : RightArrowBlack2}
            alt="Last Page"
          />
        </button>
      </div>
    </div>
  );
}
