import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  bgClassName?: string; // 自定义背景色类（如：bg-black）
  textClassName?: string; // 默认按钮文字颜色类（如：text-black）
  hoverTextClassName?: string; // 悬停时文字颜色类（如：hover:text-green-400）
  activeTextClassName?: string; // 当前页按钮文字颜色类（如：text-green-400 font-bold）
  dotClassName?: string; // 分隔点颜色类（如：bg-gray-300）
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  bgClassName = "",
  textClassName = "text-black",
  hoverTextClassName = "hover:text-[#bfea52]",
  activeTextClassName = "text-[#bfea52] font-bold",
  dotClassName = "bg-white",
}) => {
  // 计算显示的页码范围
  const getVisiblePages = () => {
    const pages: number[] = [];

    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于等于最大显示页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 计算起始页码
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // 调整起始页码，确保显示足够的页码
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-2 px-5 py-8`}>
      {/* 上一页按钮 */}
      {currentPage > 1 && (
        <button
          onClick={handlePrevious}
          className={`w-10 py-2 px-2.5 rounded-[5px] text-sm transition-colors cursor-pointer ${bgClassName} ${textClassName} ${hoverTextClassName}`}
        >
          &lt;
        </button>
      )}

      {/* 页码 */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={`w-10 py-2 px-2.5 rounded-[5px] text-sm transition-colors cursor-pointer ${bgClassName} ${
              page === currentPage
                ? `${activeTextClassName}`
                : `${textClassName} ${hoverTextClassName}`
            }`}
          >
            {page}
          </button>
          {/* 分隔点 */}
          {index < visiblePages.length - 1 && (
            <div className={`w-1 h-1 rounded-full ${dotClassName}`} />
          )}
        </React.Fragment>
      ))}

      {/* 下一页按钮 */}
      {currentPage < totalPages && (
        <button
          onClick={handleNext}
          className={`w-10 py-2 px-2.5 rounded-[5px] text-sm ml-2 transition-colors cursor-pointer ${bgClassName} ${textClassName} ${hoverTextClassName}`}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
