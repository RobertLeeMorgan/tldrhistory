import { useQuery } from "@tanstack/react-query";
import { fetchPopulation, fetchPopular } from "../../util/http";
import { getCentury, formatNumber } from "../../util/formatWidget";
import { useState, useEffect } from "react";
import Stats from "./Stats";

export default function Widgets({year}) {
  const [population, setPopulation] = useState({
    population: 10000,
    year_start: -300000,
    year_end: -200001,
  });

  const { data } = useQuery({
    queryKey: ["population"],
    queryFn: fetchPopulation,
    throwOnError: true,
  });

  const { data: popular } = useQuery({
    queryKey: ["popular", year],
    queryFn: () => fetchPopular(year),
    throwOnError: true,
  });

  useEffect(() => {
    if (data && data.population) {
      for (let i = 0; i < data.population.length; i++) {
        const range = data.population[i];
        if (year >= range.year_start && year <= range.year_end) {
          setPopulation(range);
          return;
        }
      }
    }
  }, [data, year]);

  const name = popular && popular.length > 0 ? popular[0]["post.name"] : "";
  const type = popular && popular.length > 0 ? popular[0]["post.type"] : "";
  const likes = popular && popular.length > 0 ? popular[0].likes : "";

  return (
    <>
      <div className="stats bg-purple-800 stats-vertical border bottom-0 left:0 md:right-0 border-t-0 border-black h-full overflow-hidden rounded-none shadow fixed z-50 w-min ">
        <Stats
          value={getCentury(year)}
          desc={year > 0 ? "Century CE" : "Century BCE"}
        />
        <Stats
          title="Global Population"
          value={formatNumber(population.population)}
        />
        <Stats
          title="Most Popular"
          value={name ? name.toUpperCase() : "-"}
          desc={`${
            type.charAt(0).toUpperCase() + type.slice(1)
          }, ${likes} like(s)`}
          format={`${
            name.length < 8
              ? "text-xl leading-6"
              : "text-sm leading-2"
          } md:text-xl md:leading-5 font-semibold text-ellipsis overflow-hidden text-wrap w-40 text-center`}
        />
      </div>
    </>
  );
}