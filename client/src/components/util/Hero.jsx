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
        backgroundImage = "/bg-4.webp";
        break;
      case "/login":
        backgroundImage = "/bg-2.webp";
        break;
      case "/register":
        backgroundImage = "/bg-6.webp";
        break;
      case "/post":
        backgroundImage = "/bg-5.webp";
        break;
      default:
        if (location.pathname.startsWith("/user/")) {
          backgroundImage = "/bg-3.webp";
        } else if (location.pathname.startsWith("/edit/")) {
          backgroundImage = "/bg-5.webp";
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
