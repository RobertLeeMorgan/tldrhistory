import { useLocation } from "react-router-dom";

export default function Hero({ children, image }) {
  const location = useLocation();
  let backgroundImage;
  if (image) {
    backgroundImage = image;
  } else {
    switch (location.pathname) {
      case "/":
        backgroundImage = "/bg-home.webp";
        break;
      case "/login":
        backgroundImage = "/bg-login.webp";
        break;
      case "/register":
        backgroundImage = "/bg-login.webp";
        break;
      case "/post":
        backgroundImage = "/bg-post.webp";
        break;
      default:
        if (location.pathname.startsWith("/user/")) {
          backgroundImage = "/bg-user.webp";
        } else if (location.pathname.startsWith("/edit/")) {
          backgroundImage = "/bg-post.webp";
        }
        break;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed background layer */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* Foreground content */}
      <div className="hero min-h-screen">{children}</div>
    </div>
  );
}
