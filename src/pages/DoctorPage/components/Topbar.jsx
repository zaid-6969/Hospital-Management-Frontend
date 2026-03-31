import { Icon, icons } from "./Icon";

const Topbar = ({ title }) => {
  return (
    <header className="h-16 bg-card border-b bg-card border border-border border border-border dark:border-gray-700 flex justify-between items-center px-6">

      <h1 className="font-semibold text-lg">{title}</h1>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="px-3 py-1.5 rounded-lg bg-bg border border-gray-300 dark:border-gray-600 text-sm outline-none"
        />

        <button className="relative">
          <Icon d={icons.bell} />
        </button>
      </div>

    </header>
  );
};

export default Topbar;