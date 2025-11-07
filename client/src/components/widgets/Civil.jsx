import { useEffect, useRef } from "react";
import Table from "./Table";

export default function Civil({ civil, year }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const yearIndex = Math.floor(year / 100) + 50;

    if (tableRef.current) {
      const columnWidth = 48;
      const containerWidth = tableRef.current.clientWidth;
      const scrollPosition = yearIndex * columnWidth - containerWidth / 2;
      tableRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [year]);

  return (
    <div className="overflow-hidden scroll-smooth" ref={tableRef}>
      <Table civil={civil} />
    </div>
  );
}
