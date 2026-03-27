import { Icon, icons } from "./Icon";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-card p-5 rounded-2xl shadow">
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-gray-500">{title}</p>
    </div>
  );
};

export default StatCard;