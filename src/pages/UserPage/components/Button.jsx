const Button = ({ children }) => {
  return (
    <button className="bg-violet-600 bg-card border-r border border-border border border-border px-5 py-2 rounded-full">
      {children}
    </button>
  );
};

export default Button;