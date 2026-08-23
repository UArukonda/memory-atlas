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
        className="rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-muted disabled:cursor-not-allowed"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
