export default function DrawerInput({ name, type, min, max, placeholder, className, defaultValue }) {
    return (
      <label>
        <input
          type={type}
          name={name}
          min={min}
          max={max}
          placeholder={placeholder}
          className={className}
          defaultValue={defaultValue}
        />
      </label>
    );
  }