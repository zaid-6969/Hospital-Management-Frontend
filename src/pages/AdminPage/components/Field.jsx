const Field = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-text/60 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
};

export default Field;