import React, { useMemo } from "react";

interface GenericPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const GenericPagination: React.FC<GenericPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = useMemo(() => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
      >
        Prev
      </button>

      {/* {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))} */}

      {visiblePages.map((page, index) =>
        typeof page === "string" ? (
          <span
            key={page}
            className="px-3 py-1 text-sm text-gray-500"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default GenericPagination;
