import CardDetails from "./CardDetails";
import CardFooter from "./CardFooter";

export default function Card({
  name,
  id,
  type,
  start,
  end,
  country,
  cause,
  description,
  subject,
  username,
  liked,
  userId,
  created,
}) {
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className="card bg-base-100 shadow-xl"
      style={{
        width: "clamp(350px, 40vw, 550px)",
        ...(isMobile && { width: "clamp(250px, 90vw, 400px)" }),
      }}
    >
      <div className="card-body">
        <CardDetails
          name={name}
          type={type}
          start={start}
          end={end}
          country={country}
          cause={cause}
          description={description}
          subject={subject}
        />
        <CardFooter
          id={id}
          username={username}
          liked={liked}
          userId={userId}
          created={created}
        />
      </div>
    </div>
  );
}
