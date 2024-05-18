import React from "react";
import { useLocation } from "react-router-dom";

export default function Hero({ children, image }) {
  const location = useLocation();
  let backgroundImage;
  if (image) {
    backgroundImage = image;
  } else {
    switch (location.pathname) {
      case "/":
        backgroundImage = "/bg-4.jpg";
        break;
      case "/login":
        backgroundImage = "/bg-2.jpg";
        break;
      case "/register":
        backgroundImage = "/bg-6.jpg";
        break;
      case "/post":
        backgroundImage = "/bg-5.jpg";
        break;
      default:
        if (location.pathname.startsWith("/user/")) {
          backgroundImage = "/bg-3.jpg";
        } else if (location.pathname.startsWith("/edit/")) {
          backgroundImage = "/bg-5.jpg";
        }
        break;
    }
  }

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="hero-overlay bg-opacity-20"></div>
      {children}
    </div>
  );
}
