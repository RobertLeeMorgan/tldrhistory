import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useInteractionContext } from "../../context/InteractionContext";
import { deleteArticle, queryClient } from "../../util/http";
import { toast } from "react-toastify";
import DeleteModal from "../util/DeleteModal";

export default function DeleteArticle() {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();
  const { postId } = useInteractionContext();

  const { mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: deleteArticle,
  });

  if (isError && error.message === "jwt expired") {
    navigate("/login");
    logout();
    toast("Your session has expired, please log back in.");
  } else if (isError) {
    toast.error("Delete failed, try again later.");
  }

  useEffect(() => {
    if (isSuccess) {
      document.getElementById(`my_modal_${postId}`).close();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Your article has been deleted!");
      reset();
    }
    [isSuccess];
  });

  function handleSubmit() {
    mutate({ id: postId, token: isAuth.token });
  }
  return <DeleteModal handleDelete={handleSubmit} isPending={isPending} />;
}
