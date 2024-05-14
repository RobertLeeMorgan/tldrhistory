import Type from "./Type";
import {decodedText} from '../../util/formatText'

export default function CardDetails({
  start,
  end,
  country,
  cause,
  type,
  name,
  description,
  subject,
}) {
  return (
    <>
      <h2 className="card-title text-slate-300 text-xl">
        {decodedText(name)}
        <div className="badge badge-secondary">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </h2>
      <Type
        start={start}
        end={end}
        country={country}
        cause={cause}
        type={type}
      />
      <p className="justify-start text-left flex mb-2 text-base md:text-lg text-slate-300">
        {decodedText(description)}
      </p>
      <div className="card-actions justify-start mb-1">
        {subject.map((e) => (
          <div className="badge badge-outline" key={e.subject}>
            {e.subject.charAt(0).toUpperCase() + e.subject.slice(1)}
          </div>
        ))}
      </div>
    </>
  );
}
