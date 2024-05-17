import Widgets from "./Widgets";
import Civil from "./Civil";
import { fetchCivil } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
import { useYear } from "../../context/YearContext";

export default function WidgetContainter({ widgetDisplay }) {
  const { year } = useYear();

  const { data: civil } = useQuery({
    queryKey: ["civil"],
    queryFn: fetchCivil,
    throwOnError: true,
  });

  return (
    <div
      className={`${
        widgetDisplay ? "translate-y-0" : "translate-y-full"
      } fixed w-screen bottom-0 z-40 transform duration-300 ease-in-out`}
    >
      {civil && (
        <>
          <Widgets year={year} />
          <Civil civil={civil} year={year} />
        </>
      )}
    </div>
  );
}
