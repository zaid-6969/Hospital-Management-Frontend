const FeedbackCard = () => {
  const feedbacks = [
    { initials: "PK", name: "Patient", comment: "Doctor was very helpful and calm during the consultation." },
    { initials: "RN", name: "Patient", comment: "Waiting time could be improved, but treatment was excellent." },
  ];

  return (
    <div
      className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-medium mb-4" style={{ color: "var(--text)", opacity: .5 }}>
        Recent Feedback
      </p>

      <div className="space-y-3">
        {feedbacks.map(({ initials, name, comment }, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-xl"
            style={{ background: "rgba(106,90,205,0.06)", border: "1px solid rgba(106,90,205,0.1)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
            >
              {initials}
            </div>
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: "var(--text)" }}>{name}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text)", opacity: .55 }}>{comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackCard;
