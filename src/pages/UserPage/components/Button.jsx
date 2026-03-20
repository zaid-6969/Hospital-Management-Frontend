const Button = ({ children }) => {
  return (
    <button className="bg-violet-600 text-white px-5 py-2 rounded-full">
      {children}
    </button>
  );
};

export default Button;