import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, onBook }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user/doctor/${doctor._id}`)}
      className="bg-card rounded-2xl p-5 flex gap-4 shadow hover:-translate-y-1 transition"
    >
      <img
        src={doctor.image?.url}
        alt=""
        className="w-32 h-32 object-cover rounded-xl"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-bold text-lg">{doctor.name}</h2>
          <p className="text-indigo-600 text-sm">{doctor.specialization}</p>

          <div className="mt-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Experience
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {doctor.experience} Years Experience
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-gray-400">Next Available</p>
            <p className="text-sm font-semibold">{doctor.next}</p>
          </div>

          <button
            onClick={onBook}
            className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-card border-r border border-border border border-border px-4 py-2 rounded-lg text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
