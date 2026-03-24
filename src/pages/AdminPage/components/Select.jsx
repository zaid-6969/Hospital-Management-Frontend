const Select = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="w-full px-3 py-2 border rounded-lg bg-gray-50"
    >
      {children}
    </select>
  );
};

export default Select;