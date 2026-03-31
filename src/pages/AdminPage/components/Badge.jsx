const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-text/50 uppercase tracking-wider">{label}</label>}
    {children}
  </div>
);

export default Field;