import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Like from "./Like";
import CardDetails from "./CardDetails";

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
  const { isAuth } = useAuth();

  return (
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
      {userId == isAuth.id ? (
        <div className="flex justify-center mt-2">
          <Link
            className="btn btn-secondary btn-sm w-16 mr-3"
            to={`/edit/${id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-outline btn-sm w-16"
            onClick={() =>
              document.getElementById(`my_modal_${id}`).showModal()
            }
          >
            Delete
          </button>
        </div>
      ) : (
        username && (
          <p className="text-right italic text-gray-500 text-sm">
            by{" "}
            <Link className="text-gray-400 not-italic" to={`/user/${userId}`}>
              {username}
            </Link>
            , {new Date(created).toLocaleDateString("en-GB")}
          </p>
        )
      )}
      {userId != isAuth.id ? <Like liked={liked} id={id} /> : <Link to={'/login'}/>}
    </div>
  );
}
