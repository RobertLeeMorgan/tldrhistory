import Nav from "../components/util/Nav";
import Hero from "../components/util/Hero";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <>
      <Nav />
      <Hero image={"/bg-error.webp"}>
        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <h1 className="font-bold mb-2">Oops! Something went wrong.</h1>
          <p>Status: {error.status}</p>
          {error.data && <p className="mt-2">{error.data}</p>}
          <p className="mt-2">{error.message}</p>
        </div>
      </Hero>
    </>
  );
}
