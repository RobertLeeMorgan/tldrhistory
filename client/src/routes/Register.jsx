import { useMutation } from "@tanstack/react-query";
import { register } from "../util/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlertMessage from "../components/util/AlertMessage";
import EmailInput from "../components/form/EmailInput";
import PasswordInput from "../components/form/PasswordInput";

export default function Register() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("You have registered, you can now log in!");
      navigate("/login");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmation = formData.get("confirmation");

    mutate({ email, password, username, confirmation });
  }

  return (
    <form
      id="registration-form"
      className="flex flex-col items-center max-w-3xl sm:px-4 "
      onSubmit={handleSubmit}
    >
      <h1 className="mb-6 text-4xl font-bold text-slate-200 text-center">Register</h1>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          name="username"
        />
      </label>
      <EmailInput />
      <PasswordInput />
      <PasswordInput confirm />
      {isPending ? (
        <button className="btn mt-4">
          <span className="loading loading-spinner"></span>
          Registering
        </button>
      ) : (
        <button type="submit" className="btn btn-secondary my-4">
          Sign Up
        </button>
      )}
      {isError && <AlertMessage message={error.message} />}
    </form>
  );
}
