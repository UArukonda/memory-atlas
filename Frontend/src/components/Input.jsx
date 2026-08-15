const Input = ({
  id,
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  disabled,
  readOnly,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-blue-500 mb-2"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
