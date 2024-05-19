import { Suspense, lazy } from "react";

const TableRow = lazy(() => import("./TableRow"));

export default function TableBody({ centuries, continents, civil }) {
  return (
    <tbody>
      {continents.map((continent) => {
        const civilizations = civil.civil.filter(
          (entry) => entry.country.continent === continent
        );

        // Sort civilizations by start year
        civilizations.sort((a, b) => a.start_year - b.start_year);

        let rows = [];

        civilizations.forEach((civilization) => {
          let placed = false;

          // Check if civilization overlaps with any existing row
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Check if civilization's timespan overlaps with any civilization in the row
            const overlap = row.some((entry) => {
              return (
                (civilization.start_year <= entry.end_year &&
                  civilization.end_year >= entry.start_year) ||
                (entry.start_year <= civilization.end_year &&
                  entry.end_year >= civilization.start_year)
              );
            });

            if (!overlap) {
              rows[i].push(civilization);
              placed = true;
              break;
            }
          }

          // If civilization doesn't overlap with any existing row, create a new row
          if (!placed) {
            rows.push([civilization]);
          }
        });

        return rows.map((row, rowIndex) => (
          <Suspense key={`${continent}-${rowIndex}`} fallback={<></>}>
            <TableRow
              continent={continent}
              rowIndex={rowIndex}
              centuries={centuries}
              row={row}
            />
          </Suspense>
        ));
      })}
    </tbody>
  );
}
