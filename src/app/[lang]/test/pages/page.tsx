"use client";

import SmartPagination from "@/components/common/smart-pagination";
import { useState } from "react";

const TestingPages = () => {
  const [currentPage, setCurrentPage] = useState(5); // initial page
  const totalPages = 100;

  const handlePageChange = (page: number) => {
    console.log("Switched to page:", page);
    setCurrentPage(page);
  };

  return (
    <div className="grid place-content-center min-h-screen bg-base-200">
      <div className="p-6 bg-base-100 rounded-xl shadow-md space-y-4">
        <h2 className="text-center text-lg font-semibold">
          📄 Smart Pagination Demo
        </h2>

        <SmartPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          maxVisible={10}
          showNextPrev
          variant="outline"
          size="sm"
        />

        <p className="text-center text-sm text-muted-foreground">
          Current page: <span className="font-bold">{currentPage}</span>
        </p>
      </div>
    </div>
  );
};

export default TestingPages;
