const Select = ({ label, children, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-text/50 uppercase tracking-wider">{label}</label>}
    <select
      {...props}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-bg text-text text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition"
    >
      {children}
    </select>
  </div>
);

export default Select;