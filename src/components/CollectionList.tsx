type Column<T> = {
  Header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};


const Collectionlist = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {
  return (
    <div className="rounded-t-xl shadow-md overflow-hidden">
      <div className="max-h-[60vh] overflow-y-auto rounded-t-xl shadow-md scrollbar-hidden">
        <table className="min-w-full text-sm text-gray-700 text-left">
          <thead className="bg-[#2b2a28] sticky top-0 text-white">
            <tr>
              {columns.map((col) => (
                <th key={String(col.accessor)} className="p-4 border-b font-medium">
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="p-2 border-b">
                    {col.accessor.toString().toLowerCase() === "image" ? (
                      <img
                        src={row[col.accessor]}
                        alt="table-item"
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collectionlist;
