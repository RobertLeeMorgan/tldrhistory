import { useMemo, lazy, Suspense } from "react";

const TableHeader = lazy(() => import("./TableHeader"));
const TableBody = lazy(() => import("./TableBody"));

export default function Table({ civil }) {
  const centuries = useMemo(() => {
    const centuriesArray = [];
    for (let century = -3000; century <= 30; century++) {
      if (century !== 0) {
        centuriesArray.push(century);
      }
    }
    return centuriesArray;
  }, []);

  const continents = useMemo(() => {
    return [...new Set(civil.civil.map((entry) => entry.country.continent))];
  }, [civil]);

  return (
    <Suspense fallback={<></>}>
      <table className="table-fixed w-12 bg-gray-900 pb-4">
        <TableHeader centuries={centuries} />
        <TableBody
          centuries={centuries}
          continents={continents}
          civil={civil}
        />
      </table>
    </Suspense>
  );
}
