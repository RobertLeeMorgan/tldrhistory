import Form from "../components/form/Form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost } from "../util/http";
import { queryClient } from "../util/http";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Post() {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "civil"] });
      toast.success("Your article was successfully posted!");
      navigate("/");
    },
  });

  if(isError && error.message === "jwt expired") {
    logout();
    toast("Your session has expired, please log in again.");
    navigate("/login");
  }

  function handleSubmit(formData) {
    mutate({ article: formData, token: isAuth.token });
  }

  return (
    <Form
      onSubmit={handleSubmit}
      isPending={isPending}
      isError={isError}
      error={error}
    />
  );
}
