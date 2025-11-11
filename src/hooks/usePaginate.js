import { useState, useMemo } from 'react';

export const usePaginate = ({ initialPage = 0, initialSize = 10 } = {}) => {
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: initialSize,
    total_pages: 0,
    total_elements: 0,
  });

  const setPaginationData = (data) => {
    setPagination({
      page: data.currentPage,
      size: data.pageSize,
      total_pages: data.totalPages,
      total_elements: data.totalElements,
    });
  };

  const nextPage = () => {
    if (pagination.page < pagination.total_pages - 1) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const prevPage = () => {
    if (pagination.page > 0) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < pagination.total_pages) {
      setPagination((prev) => ({ ...prev, page }));
    }
  };

  const hasNextPage = useMemo(() => {
    return pagination.page < pagination.total_pages - 1;
  }, [pagination.page, pagination.total_pages]);

  const hasPrevPage = useMemo(() => {
    return pagination.page > 0;
  }, [pagination.page]);

  return {
    ...pagination,
    setPaginationData,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage,
    hasPrevPage,
    pageParams: {
      page: pagination.page,
      size: pagination.size,
    },
  };
};