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
      <label htmlFor={id} className="text-sm font-medium text-heading">
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-body outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-border/30 disabled:text-muted"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
