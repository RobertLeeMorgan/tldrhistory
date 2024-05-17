import Form from "../components/form/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, fetchArticle, queryClient } from "../util/http";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  const { isAuth, logout } = useAuth();

  const { data, isPending: loading } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.id }),
    throwOnError: true,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Your article was successfully edited!");
      navigate("/");
    },
    onError: (err) => {
      if (err.message === "jwt expired") {
        logout();
        toast("Your session has expired, please log in again.");
        navigate("/login");
      }
    }
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, article: formData, token: isAuth.token });
  }

  return (
    <>
      {loading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <Form
          article={data}
          onSubmit={handleSubmit}
          isPending={isPending}
          error={error}
          isError={isError}
          isEditing
        />
      )}
    </>
  );
}
