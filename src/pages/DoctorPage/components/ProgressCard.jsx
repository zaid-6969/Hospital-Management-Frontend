const ProgressCard = () => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-4">
        Development Goals
      </h3>

      <div className="mb-4">
        <p className="text-sm">CME Credits</p>
        <div className="w-full bg-primary/20 h-2 rounded">
          <div className="bg-primary h-2 w-[80%] rounded"></div>
        </div>
      </div>

      <div>
        <p className="text-sm">Peer Reviews</p>
        <div className="w-full bg-primary/20 h-2 rounded">
          <div className="bg-primary h-2 w-[60%] rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;