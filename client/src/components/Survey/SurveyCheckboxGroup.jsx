export const CheckboxGroup = ({
  labelText,
  options,
  register,
  name,
  selected,
  error,
  isRequired,
}) => (
  <div className="form-control mb-4">
    <label className="label">
      <span className="font-bold text-brown-dark label-text">{labelText}</span>
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <div key={option} className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              value={option}
              {...register(name, {
                required: isRequired ? "Please select at least one day" : false,
              })}
              className="checkbox hidden peer"
            />
            <span
              className={`label-text btn btn-outline font-bold ${
                selected?.includes(option) ? "bg-blue-dark text-white" : ""
              }`}
            >
              {option}
            </span>
          </label>
        </div>
      ))}
    </div>
    {error && (
      <span className="text-red-600">Please select at least one day</span>
    )}
  </div>
);
