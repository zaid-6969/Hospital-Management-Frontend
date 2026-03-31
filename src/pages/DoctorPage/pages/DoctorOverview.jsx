import { useEffect, useState } from "react";
import { getMyDoctor } from "../../../utils/api";
import StatsCard from "../components/StatsCard";
import ProgressCard from "../components/ProgressCard";
import FeedbackCard from "../components/FeedbackCard";

const DoctorOverview = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const { data } = await getMyDoctor();
      setDoctor(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome Dr. {doctor?.name}
        </h1>
        <p className="text-text/60">
          {doctor?.specialization}
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard />
        <ProgressCard />
        <FeedbackCard />
      </div>

    </main>
  );
};

export default DoctorOverview;