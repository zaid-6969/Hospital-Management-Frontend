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
    <main className="pt-24 px-6 md:px-12 grid grid-cols-12 gap-8">
      <section className="col-span-12 lg:col-span-9 space-y-6">
        <h2 className="text-3xl font-bold">My Schedule</h2>

        {appointments.length === 0 ? (
          <p>No appointments</p>
        ) : (
          appointments.map((item) => (
            <TimelineCard
              key={item._id}
              data={item}
              refresh={fetchAppointments} // 🔥 important
            />
          ))
        )}
      </section>
    </main>
  );
};

export default DoctorSchedule;