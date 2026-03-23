import { useState } from "react";

const PatientModal = ({ onClose }) => {
  const [data, setData] = useState({
    name: "",
    phone: "",
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#5140b3]">
          New Patient
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setData({ ...data, phone: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button className="px-4 py-2 bg-[#5140b3] text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;