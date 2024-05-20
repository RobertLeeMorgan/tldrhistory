import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInteractionContext } from "../../context/InteractionContext";

export default function Like({ liked, id }) {
  const { isAuth} = useAuth();
  const { setLikeId } = useInteractionContext();
  const navigate = useNavigate();

  function handleClick() {
    if (isAuth.token) {
      setLikeId(id);
    } else {
      navigate("/login");
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className="btn btn-ghost absolute top-2 btn-sm right-1"
      aria-label="Like article"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={liked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
