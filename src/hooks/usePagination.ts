import { useState, useMemo } from 'react';

export interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  handlePageChange: (page: number) => void;
  setCurrentPage: (page: number) => void;
}

export function usePagination<T>({ 
  data, 
  itemsPerPage = 4 
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return {
      totalPages,
      currentData,
    };
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages: paginationData.totalPages,
    currentData: paginationData.currentData,
    handlePageChange,
    setCurrentPage,
  };
}