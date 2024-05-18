import { queryClient, like } from "../../util/http";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Like({ liked, id }) {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: likeMutate,
    isError,
    error,
  } = useMutation({
    mutationFn: like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isError && error.message === "jwt expired") {
    logout();
    toast("Your session has expired, please log in again.");
    navigate("/login");
  } else if (isError) {
    toast.error("Failed to like article, please try again later.");
  }

  function handleClick() {
    if (isAuth.token) {
      likeMutate({ id, token: isAuth.token });
    } else {
      navigate("/login");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-ghost absolute top-2 btn-sm right-1"
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
