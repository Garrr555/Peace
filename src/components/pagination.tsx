import { ArrowLeft, ArrowRight } from "lucide-react";

interface PropsPagination {
  page: number;
  totalPage: number;
  onPage: (page: number) => void;
}

export default function Pagination({
  page,
  totalPage,
  onPage,
}: PropsPagination) {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        type="button"
        aria-label="Previous"
        className="mr-4 disabled:hidden"
      >
        <ArrowLeft />
      </button>

      <div className="flex gap-2 text-gray-500 text-sm md:text-base">
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => onPage(i + 1)}
            type="button"
            className={`flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square transition-all ${page === i + 1 ? "bg-purple-600 border border-purple-700 rounded-md text-white" : "bg-white border border-gray-200 rounded-md hover:bg-gray-100/70"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        disabled={page === totalPage}
        onClick={() => onPage(page + 1)}
        type="button"
        aria-label="Next"
        className="ml-4 disabled:hidden"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
