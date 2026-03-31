import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { doctor, date, time, patientName } = state || {};

  return (
    <div className="bg-[#f8f9fb] dark:bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Appointment Booked!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your appointment has been successfully requested.
        </p>

        {doctor && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 text-left space-y-3 mb-8">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-600">
              <img
                src={doctor.image?.url}
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{doctor.name}</p>
                <p className="text-sm text-indigo-600">{doctor.specialization}</p>
              </div>
            </div>

            {patientName && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Patient</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{patientName}</span>
              </div>
            )}
            {date && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {new Date(date).toDateString()}
                </span>
              </div>
            )}
            {time && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{time}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
                Pending Confirmation
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/user")}
            className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/user/appointment")}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Book Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
