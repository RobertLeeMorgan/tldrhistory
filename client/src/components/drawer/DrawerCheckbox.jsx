export default function DrawerCheckbox({ name, value, labelText, defaultChecked }) {
  return (
    <label className="label cursor-pointer">
      <span className="label-text">{labelText}</span>
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} />
    </label>
  );
}