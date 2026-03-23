const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-5 border-r">
      <h2 className="text-lg font-bold text-[#5140b3] mb-6">
        Reception Desk
      </h2>

      <ul className="space-y-3">
        <li className="p-2 rounded-lg bg-[#edeef0] cursor-pointer">
          Queue
        </li>
        <li className="p-2 hover:bg-[#f1f2ff] rounded-lg cursor-pointer">
          Patients
        </li>
        <li className="p-2 hover:bg-[#f1f2ff] rounded-lg cursor-pointer">
          Rooms
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;