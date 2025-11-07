export default function DrawerCollapse({ title, children }) {
    return (
      <div className="collapse bg-base-200">
        <input type="checkbox" name={title}/>
        <div className="collapse-title text-lg font-medium">{title}</div>
        <div className="collapse-content">{children}</div>
      </div>
    );
  }