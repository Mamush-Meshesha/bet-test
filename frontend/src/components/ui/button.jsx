const Button = ({ type = "submit", children, className = "" }) => {
  return (
    <button
      type={type}
      className={`bg-accent text-text-light px-6 py-2 i h-12 w-full rounded hover:opacity-90 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;