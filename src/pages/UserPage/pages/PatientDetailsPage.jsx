import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePatientDetails } from "../services/api";
import { createAppointmentThunk } from "../../../redux/Slices/appointmentSlice";
import toast from "react-hot-toast";

const FIELDS = [
  {
    section: "Personal Information",
    icon: "👤",
    fields: [
      { key: "patientName", label: "Full Name", type: "text", required: true, placeholder: "Enter patient's full name" },
      { key: "age", label: "Age", type: "number", required: true, placeholder: "e.g. 28", unit: "years" },
      { key: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { key: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. +91 98765 43210" },
      { key: "address", label: "Address", type: "textarea", placeholder: "Enter full address" },
    ],
  },
  {
    section: "Vitals",
    icon: "🩺",
    fields: [
      { key: "bodyTemperature", label: "Body Temperature", type: "number", step: "0.1", placeholder: "e.g. 98.6", unit: "°F" },
      { key: "weight", label: "Weight", type: "number", step: "0.1", placeholder: "e.g. 70", unit: "kg" },
      { key: "height", label: "Height", type: "number", placeholder: "e.g. 175", unit: "cm" },
      { key: "bloodPressure", label: "Blood Pressure", type: "text", placeholder: "e.g. 120/80", unit: "mmHg" },
      { key: "heartRate", label: "Heart Rate", type: "number", placeholder: "e.g. 72", unit: "bpm" },
      { key: "oxygenSaturation", label: "Oxygen Saturation", type: "number", placeholder: "e.g. 98", unit: "%" },
    ],
  },
  {
    section: "Medical History",
    icon: "📋",
    fields: [
      { key: "symptoms", label: "Chief Complaint / Symptoms", type: "textarea", placeholder: "Describe symptoms or reason for visit" },
      { key: "allergies", label: "Known Allergies", type: "textarea", placeholder: "e.g. Penicillin, pollen, dust..." },
      { key: "currentMedications", label: "Current Medications", type: "textarea", placeholder: "List any medications currently being taken" },
      { key: "notes", label: "Additional Notes", type: "textarea", placeholder: "Any other relevant information" },
    ],
  },
];

const PatientDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doctor, date, time } = state || {};

  const [form, setForm] = useState({
    patientName: "", age: "", gender: "Male", phone: "", address: "",
    bodyTemperature: "", weight: "", height: "", bloodPressure: "",
    heartRate: "", oxygenSaturation: "",
    symptoms: "", allergies: "", currentMedications: "", notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!doctor || !date || !time) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-text/60">No appointment info found.</p>
        <button
          onClick={() => navigate("/user/appointment")}
          className="bg-indigo-600 bg-card border-r border border-border px-6 py-2 rounded-lg"
        >
          Go back to Appointments
        </button>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!form.patientName.trim()) newErrors.patientName = "Name is required";
    if (!form.age || form.age < 0 || form.age > 150) newErrors.age = "Valid age required";
    if (!form.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create appointment via Redux thunk (includes slot conflict check)
      const result = await dispatch(
        createAppointmentThunk({ doctorId: doctor._id, date, time })
      );

      if (createAppointmentThunk.rejected.match(result)) {
        // Error toasts are shown inside the thunk
        setLoading(false);
        return;
      }

      const appointmentId = result.payload._id;

      // Step 2: Save patient details
      await savePatientDetails(appointmentId, {
        ...form,
        age: Number(form.age),
        bodyTemperature: form.bodyTemperature ? Number(form.bodyTemperature) : undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        height: form.height ? Number(form.height) : undefined,
        heartRate: form.heartRate ? Number(form.heartRate) : undefined,
        oxygenSaturation: form.oxygenSaturation ? Number(form.oxygenSaturation) : undefined,
      });

      toast.success(`Appointment request sent to Dr. ${doctor.name}!`);

      navigate("/user/booking-success", {
        state: { doctor, date, time, patientName: form.patientName },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const val = form[field.key];
    const err = errors[field.key];

    const baseInputClass = `w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
      err
        ? "border-red-400 bg-red-50 dark:bg-red-900/10"
        : "bg-card border-border dark:border-gray-600 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
    }`;

    if (field.type === "select") {
      return (
        <select value={val} onChange={(e) => handleChange(field.key, e.target.value)} className={baseInputClass}>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          value={val}
          onChange={(e) => handleChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={`${baseInputClass} resize-none`}
        />
      );
    }

    return (
      <div className="relative">
        <input
          type={field.type}
          step={field.step}
          value={val}
          onChange={(e) => handleChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={`${baseInputClass} ${field.unit ? "pr-14" : ""}`}
        />
        {field.unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
            {field.unit}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-bg min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="text-sm text-indigo-600 hover:underline mb-4 flex items-center gap-1">
            ← Back
          </button>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Patient Details</h1>
          <p className="text-sm text-text/60 mt-1">Please fill in the details before confirming your appointment</p>
        </div>

        {/* Appointment Summary Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-5 mb-6 shadow-lg">
          <p className="text-xs uppercase tracking-wider text-white opacity-80 mb-2">Appointment Summary</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-white">
            {doctor.image?.url ? (
              <img src={doctor.image.url} alt={doctor.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/40" />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg border-2 border-white/40"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {doctor.name?.[0]}
              </div>
            )}
            <div>
              <p className="font-bold text-lg">{doctor.name}</p>
              <p className="text-sm opacity-80">{doctor.specialization}</p>
            </div>
            <div className="sm:ml-auto text-right">
              <p className="font-semibold">{new Date(date).toDateString()}</p>
              <p className="text-sm opacity-80">{time}</p>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {FIELDS.map((section) => (
            <div key={section.section}
              className="rounded-2xl shadow p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                <span>{section.icon}</span>
                {section.section}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.key} className={field.type === "textarea" || field.key === "address" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-text/60 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                    {renderField(field)}
                    {errors[field.key] && (
                      <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 py-4 rounded-2xl font-semibold text-base text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Booking...
              </span>
            ) : (
              "Confirm Appointment ✓"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default PatientDetailsPage;
