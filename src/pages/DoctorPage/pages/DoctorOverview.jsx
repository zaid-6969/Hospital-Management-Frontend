import { useEffect, useState } from "react";
import { getMyDoctor } from "../../../utils/api";

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
    <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">
        Welcome Dr. {doctor?.name}
      </h1>

      <p className="text-gray-500 mb-10">
        {doctor?.specialization}
      </p>
    </main>
  );
};

export default DoctorOverview;