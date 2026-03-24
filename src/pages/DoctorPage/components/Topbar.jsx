import { Icon, icons } from "./Icon";

const Topbar = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b flex justify-between items-center px-6">
      
      <div>
        <h1 className="font-semibold">{title}</h1>
      </div>

      <button className="relative">
        <Icon d={icons.bell} />
      </button>

    </header>
  );
};

export default Topbar;