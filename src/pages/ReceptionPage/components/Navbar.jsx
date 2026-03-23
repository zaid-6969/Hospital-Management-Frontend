const Navbar = ({ onOpen }) => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-[#5140b3]">
        Clinical Sanctuary Reception
      </h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search patients..."
          className="px-4 py-2 border rounded-xl w-64"
        />

        <button
          onClick={onOpen}
          className="bg-gradient-to-r from-[#5140b3] to-[#6a5acd] text-white px-6 py-2 rounded-xl font-semibold"
        >
          New Patient
        </button>
      </div>
    </div>
  );
};

export default Navbar;