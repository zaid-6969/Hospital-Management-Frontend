const ProgressCard = () => {
  const goals = [
    { label: "CME Credits", pct: 80 },
    { label: "Peer Reviews", pct: 60 },
    { label: "Patient Satisfaction", pct: 91 },
  ];

  return (
    <div
      className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-medium mb-4" style={{ color: "var(--text)", opacity: .5 }}>
        Development Goals
      </p>

      <div className="space-y-4">
        {goals.map(({ label, pct }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</span>
              <span className="text-xs font-bold" style={{ color: "#8b5cf6" }}>{pct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(106,90,205,0.15)" }}>
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg,#6a5acd,#8b5cf6)"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCard;
