import { useEffect, useState } from "react";
import { getMyAppointments } from "../../../utils/api";
import TimelineCard from "../components/TimelineCard";

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Schedule</h2>
      </div>

      {appointments.length === 0 ? (
        <p className="text-text/60">No appointments</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((item) => (
            <TimelineCard
              key={item._id}
              data={item}
              refresh={fetchAppointments}
            />
          ))}
        </div>
      )}

    </main>
  );
};

export default DoctorSchedule;