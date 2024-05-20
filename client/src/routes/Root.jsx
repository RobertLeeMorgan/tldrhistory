import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/util/Nav";
import Hero from "../components/util/Hero";

export default function RootLayout() {
  return (
    <>
      <Hero>
      <Nav />
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="dark"
        transition:Bounce
      />
      </Hero>
    </>
  );
}
