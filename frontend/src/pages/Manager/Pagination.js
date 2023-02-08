import React, { useState } from "react";
import PageNumber from "./PageNumber";
const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <PageNumber
        totalPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Pagination;