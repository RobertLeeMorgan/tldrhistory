import { fetchCivil } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
import { useYear } from "../../context/YearContext";
import Widgets from "../widgets/Widgets";
import Civil from "../widgets/Civil";

export default function WidgetContainter() {
  const { year } = useYear();

  const { data: civil } = useQuery({
    queryKey: ["civil"],
    queryFn: fetchCivil,
    throwOnError: true,
  });

  return (
    <>
      {civil && (
        <>
          <Widgets year={year} />
          <Civil civil={civil} year={year} />
        </>
      )}
    </>
  );
}
