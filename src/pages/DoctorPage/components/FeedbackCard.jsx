const FeedbackCard = () => {
  return (
    <div className="bg-card p-6 rounded-3xl shadow">
      <h3 className="font-bold mb-4">
        Recent Feedback
      </h3>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">Patient</p>
          <p className="text-sm text-gray-500">
            "Doctor was very helpful and calm."
          </p>
        </div>

        <div>
          <p className="font-semibold">Patient</p>
          <p className="text-sm text-gray-500">
            "Waiting time could be improved."
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;