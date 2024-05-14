export default function DateInput({
  label,
  namePrefix,
  checkDates,
  handleChange,
}) {
  return (
    <div className="form-control flex flex-wrap justify-between mb-4">
      <label className="mb-2" htmlFor={`${namePrefix}_year`}>
        {label} Date
      </label>
      <div className="flex items-center">
        <input
          type="number"
          id={`${namePrefix}_year`}
          name={`${namePrefix}_year`}
          placeholder="Year"
          value={checkDates[`${namePrefix}_year`]}
          onChange={handleChange}
          min="-300000"
          max={namePrefix === 'end' ? 1950: 1900}
          className="input input-bordered w-full max-w-md rounded-r-none border-r-0"
          required={label === "Start" && true}
        />
        <input
          type="number"
          id={`${namePrefix}_month`}
          name={`${namePrefix}_month`}
          placeholder="Month"
          value={checkDates[`${namePrefix}_month`]}
          onChange={handleChange}
          min="0"
          max="12"
          className="input input-bordered w-full max-w-md rounded-none"
        />
        <input
          type="number"
          id={`${namePrefix}_day`}
          name={`${namePrefix}_day`}
          placeholder="Day"
          min="0"
          max={
            checkDates[`${namePrefix}_month`] &&
            checkDates[`${namePrefix}_year`] &&
            new Date(
              checkDates[`${namePrefix}_year`],
              checkDates[`${namePrefix}_month`],
              0
            ).getDate()
          }
          value={checkDates[`${namePrefix}_day`]}
          onChange={handleChange}
          className="input input-bordered w-full max-w-md rounded-bl-none rounded-tl-none border-l-0"
        />
      </div>
    </div>
  );
}
