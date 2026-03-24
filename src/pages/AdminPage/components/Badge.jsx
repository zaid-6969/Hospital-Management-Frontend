const Badge = ({ status }) => {
  const map = {
    Active: "bg-green-50 text-green-600",
    "On Leave": "bg-yellow-50 text-yellow-600",
    Operational: "bg-green-50 text-green-600",
    Maintenance: "bg-red-50 text-red-500",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
};

export default Badge;