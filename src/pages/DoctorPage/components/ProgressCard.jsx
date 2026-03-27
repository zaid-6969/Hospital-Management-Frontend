const ProgressCard = () => {
  return (
    <div className="bg-card p-6 rounded-3xl shadow">
      <h3 className="font-bold mb-4">
        Development Goals
      </h3>

      <div className="mb-4">
        <p className="text-sm">CME Credits</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-indigo-600 h-2 w-[80%] rounded"></div>
        </div>
      </div>

      <div>
        <p className="text-sm">Peer Reviews</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-orange-500 h-2 w-[60%] rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;