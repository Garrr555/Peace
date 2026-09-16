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

  // Opsional untuk tinggi tabel
  maxHeight?: string;
};

const DataTable = <T,>({
  data,
  columns,
  getRowKey,
  page,
  limit,
  maxHeight,
}: DataTableProps<T>) => {
  return (
    <div
      className={`mt-5 overflow-x-auto rounded-xl shadow-xl ${
        maxHeight ? "overflow-y-auto" : ""
      }`}
      style={maxHeight ? { maxHeight } : undefined}
    >
      <table className="min-w-full">
        <thead className="bg-slate-200">
          <tr>
            <th className="px-4 py-3 text-center">No</th>

            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 ${column.className || "text-center"}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              const rowNumber =
                page && limit ? (page - 1) * limit + index + 1 : index + 1;

              return (
                <tr
                  key={getRowKey(item, index)}
                  className="border-b hover:bg-slate-100"
                >
                  <td className="px-4 py-3 text-center">{rowNumber}</td>

                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`px-4 py-3 ${
                        column.className?.includes("text-left")
                          ? ""
                          : "text-center"
                      }`}
                    >
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-10 text-center text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
