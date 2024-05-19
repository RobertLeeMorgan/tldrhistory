import React from 'react';

const TableRow = ({ centuries, continent, rowIndex, row }) => {
  return (
    <tr key={`${continent}-${rowIndex}`}>
      {rowIndex === 0 && (
        <td className="hidden md:table-cell left-0 h-full fixed bg-slate-950">
          <div className="md:w-40 md:text-nowrap text-center text-slate-300">
            {continent}
          </div>
        </td>
      )}
      {centuries.map((century, colIndex) => {
        const civilizationsInCell = row.filter(
          (civilization) =>
            Math.floor(civilization.start_year / 100) <= century &&
            Math.floor(civilization.end_year / 100) >= century
        );

        let cellContent;
        if (civilizationsInCell.length > 0) {
          const uniqueCivilizations = civilizationsInCell.filter(
            (value, index, self) =>
              index === self.findIndex((c) => c.name === value.name)
          );

          cellContent = uniqueCivilizations.map((civilization, index) => {
            const colspan = Math.ceil(
              (civilization.end_year - civilization.start_year) / 100
            );
            const isFirstColumn =
              index === 0 &&
              colIndex === Math.floor(civilization.start_year / 100) + 50;

            if (!isFirstColumn) {
              return null;
            }

            return (
              <td
                className="text-center text-sm bg-fuchsia-700 border border-slate-900 border-2 rounded-md shadow truncate"
                key={`${continent}-${century}-${rowIndex}-${index}`}
                colSpan={colspan}
              >
                {civilization.name.toUpperCase()}
              </td>
            );
          });
        } else {
          cellContent = <td key={`${continent}-${century}-${rowIndex}`}></td>;
        }

        return cellContent;
      })}
    </tr>
  );
};

export default React.memo(TableRow);
