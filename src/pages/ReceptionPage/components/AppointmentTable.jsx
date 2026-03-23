const AppointmentTable = () => {
  const data = [
    {
      name: "Elena Jenkins",
      time: "09:30 AM",
      status: "Checked-in",
      doctor: "Dr. Julian",
    },
    {
      name: "Marcus Aurelius",
      time: "10:00 AM",
      status: "Waiting",
      doctor: "Dr. Sarah",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">
        Today's Appointments
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th>Name</th>
            <th>Time</th>
            <th>Status</th>
            <th>Doctor</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="py-3 font-medium">{item.name}</td>
              <td>{item.time}</td>
              <td>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                  {item.status}
                </span>
              </td>
              <td>{item.doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;