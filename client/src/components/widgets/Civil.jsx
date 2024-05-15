import { useEffect, useRef } from "react";
import Table from "./Table";

export default function Civil({ civil, year }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const yearIndex = Math.floor(year / 100) + 3000;

    if (tableRef.current) {
      const columnWidth = 48;
      const containerWidth = tableRef.current.clientWidth - 150;
      const scrollPosition = yearIndex * columnWidth - containerWidth / 2;

      tableRef.current.scrollLeft = scrollPosition;
    }
  }, [year]);
  return (
    <div
      className={`bottom-0 w-screen left-0 overflow-hidden scroll-smooth shadow`}
      ref={tableRef}
    >
      <Table civil={civil} />
    </div>
  );
}