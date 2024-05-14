import { useMutation } from "@tanstack/react-query";
import { login } from "../util/http";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/util/AlertMessage";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import EmailInput from "../components/form/EmailInput";
import PasswordInput from "../components/form/PasswordInput";

export default function Login() {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast("Welcome back!");
      authenticate();
      navigate("/");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    mutate({ email, password });
  }

  return (
    <form
      id="login-form"
      className="flex flex-col items-center max-w-3xl sm:px-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-6 text-4xl font-bold text-slate-200 text-center">Login</h1>
      <EmailInput />
      <PasswordInput />
      {isPending ? (
        <button className="btn mt-4">
          <span className="loading loading-spinner"></span>
          Logging In
        </button>
      ) : (
        <button type="submit" className="btn btn-secondary mt-4">
          Login
        </button>
      )}
      {isError && <AlertMessage message={error.message} />}
    </form>
  );
}
