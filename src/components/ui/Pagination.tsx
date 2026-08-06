interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-600 disabled:text-slate-300"
      >
        ‹
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`h-8 w-8 rounded text-sm ${
            pageNumber === page
              ? "bg-brand-500 text-white"
              : "border border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-600 disabled:text-slate-300"
      >
        ›
      </button>
    </div>
  );
}
