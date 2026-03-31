const StatCard = ({ title, value, icon: Icon, accent = "bg-primary/10 text-primary" }) => (
  <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
    {Icon && (
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
        <Icon size={16} />
      </div>
    )}
    <p className="text-2xl font-extrabold text-text">{value}</p>
    <p className="text-xs text-text/50 font-medium mt-0.5">{title}</p>
  </div>
);

export default StatCard;