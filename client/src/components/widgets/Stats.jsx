export default function Stats({ title, value, desc, format }) {
  return (
    <div className="stat place-items-center text-sm py-4 px-0 md:px-4 md:px-6">
      {title && <div className="stat-title">{title}</div>}
      <div className={format ? format : "stat-value text-xl md:text-4xl"}>
        {value}
      </div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
}
