const StatsCard = () => {
  const bars = [40, 65, 55, 85, 92, 70, 60, 75];

  return (
    <div
      className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium" style={{ color: "var(--text)", opacity: .5 }}>
          Efficiency Index
        </p>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
        >
          %
        </div>
      </div>

      <p className="text-3xl font-extrabold" style={{ color: "var(--text)" }}>94.2%</p>
      <p className="text-xs mt-0.5 mb-5" style={{ color: "var(--text)", opacity: .4 }}>Monthly average</p>

      <div className="flex items-end gap-1.5 h-24">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t transition-all"
            style={{
              height: `${h}%`,
              background: i === 4
                ? "linear-gradient(180deg,#8b5cf6,#6a5acd)"
                : "rgba(106,90,205,0.18)"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
