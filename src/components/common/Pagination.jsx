export const Pagination = ({ pagination }) => {
  const {
    page,
    total_pages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    goToPage,
  } = pagination;

  if (total_pages <= 1) {
    return null;
  }
  
  const getPageNumbers = () => {
    const pages = [];
    if (total_pages <= 5) {
      for (let i = 0; i < total_pages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (page > 2) pages.push('...');
      if (page > 1) pages.push(page - 1);
      if (page !== 0 && page !== total_pages - 1) pages.push(page);
      if (page < total_pages - 2) pages.push(page + 1);
      if (page < total_pages - 3) pages.push('...');
      pages.push(total_pages - 1);
    }
    return [...new Set(pages)];
  };

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={prevPage}
          disabled={!hasPrevPage}
          className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="hidden sm:flex sm:items-center sm:gap-2 sm:mx-4">
          {getPageNumbers().map((pageNum, index) =>
            typeof pageNum === 'number' ? (
              <button
                key={index}
                onClick={() => goToPage(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageNum === page
                    ? 'btn-primary z-10'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-lg'
                }`}
              >
                {pageNum + 1}
              </button>
            ) : (
              <span key={index} className="px-4 py-2 text-sm font-semibold text-gray-700">
                ...
              </span>
            )
          )}
        </div>
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className="btn-secondary text-sm ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </nav>
  );
};