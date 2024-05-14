import {decodedText} from '../../util/formatText'

export default function Type({ type, end, start, country, cause }) {
  return (
    <div className="text-left">
      {type === "person" && (
        <>
          <p>{`Born: ${start}, ${country}`}</p>
          {end && end !== "0 CE" && (
            <p>{`Died: ${end}${cause ? `, ${decodedText(cause)}` : ""}`}</p>
          )}
        </>
      )}
      {type === "landmark" && (
        <>
          <p>{`Built: ${start}, ${country}`}</p>
          {end && end !== "0 CE" && (
            <p>{`Destroyed: ${end}${cause ? `, ${decodedText(cause)}` : ""}`}</p>
          )}
        </>
      )}
      {(type === "event" || type === "period") && (
        <>
          <p>{`Start: ${start}, ${country}`}</p>
          {end && end !== "0 CE" && (
            <p>{`End: ${end}${cause ? `, ${decodedText(cause)}` : ""}`}</p>
          )}
        </>
      )}
    </div>
  );
}
