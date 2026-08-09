const Button = ({ children, type = "button" }) => {
  return (
    <>
      <button
        type={type}
        className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
