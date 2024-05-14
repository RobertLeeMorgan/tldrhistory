import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  async function handleLogout() {
    try {
      await logout();
      toast("You are logged out, bye for now!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`navbar bg-base-300 p-0 fixed top-0 left-0 right-0 z-50 delay-100 transform duration-500 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="navbar-start md:ml-8"> 
        <Link className="btn btn-ghost text-xl">TLDR History</Link>
      </div>
      <div className="navbar-end md:mr-8">
        <ul className="menu menu-horizontal px-1">
          {isAuth.token && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle btn-lg avatar mx-8"
              >
                <div className="w-12 rounded-full">
                  <img alt="Profile picture" src="/genghis.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-50 p-2 shadow opacity-100 menu menu-sm dropdown-content bg-base-100 rounded-box w-52 "
              >
                <li className="justify-between">
                  <Link to={`/user/${isAuth.id}`}>Profile</Link>
                </li>
                <li className="inline">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
          {!isAuth.token && (
            <>
              <li className="inline">
                <Link to="/login">Login</Link>
              </li>
              <div className="divider divider-horizontal mx-0"></div>
              <li className="inline">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
