export default function Stats({ title, value, desc, format }) {
  return (
    <div className="stat place-items-center text-sm py-4 px-0 md:px-4 md:px-6">
      {title && <div className="stat-title text-slate-300">{title}</div>}
      <div
        className={ format ? format : "stat-value text-slate-200 text-xl md:text-4xl"}>
        {value}
      </div>
      {desc && <div className="stat-desc text-slate-300">{desc}</div>}
    </div>
  );
}
