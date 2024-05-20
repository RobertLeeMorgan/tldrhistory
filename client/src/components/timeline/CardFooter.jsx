import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInteractionContext } from "../../context/InteractionContext";
import Like from "./Like";

export default function CardFooter({ id, username, liked, userId, created }) {
  const { isAuth } = useAuth();
  const { setInteractionData, postId } = useInteractionContext();

  function handleDelete() {
    setInteractionData(id, "delete");
    document.getElementById(`my_modal_${postId}`).showModal();
  }

  return (
    <>
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
            onClick={() => handleDelete()}
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
      {userId != isAuth.id ? (
        <Like liked={liked} id={id} />
      ) : (
        <Link to={"/login"} />
      )}
    </>
  );
}
