import { queryClient, like } from "../../util/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInteractionContext } from "../../context/InteractionContext";

export default function LikeArticle() {
  const { isAuth, logout } = useAuth();
  const { likeId, setLikeId } = useInteractionContext();
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

  useEffect(() => {
    if (likeId) {
      likeMutate({ id: likeId, token: isAuth.token });
      setLikeId(null)
    }
  }, [likeId, isAuth.token, likeMutate, setLikeId]);

  if (isError && error.message === "jwt expired") {
    logout();
    toast("Your session has expired, please log in again.");
    navigate("/login");
  } else if (isError) {
    toast.error("Failed to like article, please try again later.");
  }
}
