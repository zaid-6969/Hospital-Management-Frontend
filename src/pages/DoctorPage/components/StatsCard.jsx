const StatsCard = () => {
  const bars = [40, 65, 55, 85, 92, 70, 60, 75];

  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Efficiency Index
      </h3>

      <h1 className="text-3xl font-bold mb-6">94.2%</h1>

      <div className="flex items-end gap-2 h-40">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t ${
              i === 4 ? "bg-primary" : "bg-primary/20"
            }`}
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;