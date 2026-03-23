const RightPanel = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="font-bold mb-4">Quick Actions</h3>

        <button className="w-full mb-3 p-3 bg-purple-100 rounded-xl">
          Register Patient
        </button>

        <button className="w-full mb-3 p-3 bg-yellow-100 rounded-xl">
          Emergency Entry
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="font-bold mb-4">Doctor Availability</h3>

        <p className="text-sm">Dr. Julian - 11:30 AM</p>
        <p className="text-sm text-green-600">
          Dr. Sarah - Available
        </p>
      </div>
    </div>
  );
};

export default RightPanel;