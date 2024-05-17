export default function Hero({children}) {
  const num = Math.floor(Math.random() * 5) + 1;
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(/bg-${num}.jpg)`,
        backgroundSize: "cover", 
        backgroundAttachment: "fixed"
      }}
    >
      <div className="hero-overlay bg-opacity-20"></div>
      {children}
    </div>
  );
}
