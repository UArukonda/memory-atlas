const Button = ({ children, type = "button", onClick }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
