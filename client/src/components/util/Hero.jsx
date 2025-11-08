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
    <div className="hero min-h-screen">
      <div
        className="sm:bottom-0 bottom-[-5vh] fixed left-0 w-full sm:h-full h-[112vh] -z-10 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      />
      <div className="fixed sm:bottom-0 bottom-[-5vh] left-0 w-full sm:h-full h-[112vh] -z-5 bg-black/20" />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
