import type { ReactNode } from "react";

export type TableColumn<T> = {
  header: string;
  className?: string;
  render: (item: T, index: number) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (item: T, index: number) => string | number;

  // Opsional untuk pagination
  page?: number;
  limit?: number;

  // Opsional untuk tinggi container
  maxHeight?: string;
};

const DataCard = <T,>({
  data,
  columns,
  getRowKey,
  maxHeight,
}: DataTableProps<T>) => {
  return (
    <div
      className={`mt-5 h-screen ${
        maxHeight ? "overflow-y-auto" : ""
      }`}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => {

            return (
              <div
                key={getRowKey(item, index)}
                className="overflow-hidden rounded-xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* Content Card */}
                <div className="space-y-4 p-5">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={`${
                        column.className?.includes("text-left")
                          ? "text-left"
                          : "text-center"
                      }`}
                    >

                      <div className="text-sm text-gray-700 flex justify-center items-center">
                        {column.render(item, index)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-white px-4 py-10 text-center text-gray-500 shadow-xl">
          Tidak ada data
        </div>
      )}
    </div>
  );
};

export default DataCard;