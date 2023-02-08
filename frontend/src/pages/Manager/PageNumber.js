import React, { useState } from "react";

const PageNumber = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = currentPage; i < currentPage + 5 && i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button key={page} onClick={() => handlePageClick(page)}>
          {page}
        </button>
      ))}
      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage + 1 > totalPages}>
        Next
      </button>
    </div>
  );
};

export default PageNumber;