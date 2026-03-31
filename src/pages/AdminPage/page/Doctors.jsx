import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorStats, getDoctorById, getAllAppointments } from "../service/api";
import {
  ArrowLeft, CalendarCheck, CheckCircle2, XCircle,
  Clock, Stethoscope, Star, BadgeCheck
} from "lucide-react";

const STATUS_CONFIG = {
  ACCEPTED:  { label: "Accepted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  REJECTED:  { label: "Rejected", cls: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  REQUESTED: { label: "Pending",  cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

const Doctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [sRes, dRes, aRes] = await Promise.all([
        getDoctorStats(id), getDoctorById(id), getAllAppointments(1, 100),
      ]);
      setStats(sRes.data);
      setDoctor(dRes.data);
      setAppointments((aRes.data.data || []).filter((a) => a.doctorId?._id === id));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!doctor) return (
    <div className="text-center py-20 text-text/40">Doctor not found.</div>
  );

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-text/50 hover:text-primary transition font-medium"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Doctor profile card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-primary/20 shrink-0">
            {doctor.name?.[0] || "D"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-text">{doctor.name}</h1>
              <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                <BadgeCheck size={12} /> Verified
              </span>
            </div>
            <p className="text-primary font-semibold text-sm mt-1">{doctor.specialization}</p>
            <p className="text-text/50 text-sm mt-0.5">{doctor.experience} years of experience</p>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text/50 bg-bg rounded-lg px-3 py-1.5 border border-border">
                <Star size={12} className="text-amber-400" /> Top Rated
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text/50 bg-bg rounded-lg px-3 py-1.5 border border-border">
                <Stethoscope size={12} className="text-primary" /> {doctor.specialization}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text/50 bg-bg rounded-lg px-3 py-1.5 border border-border">
                <CalendarCheck size={12} className="text-emerald-500" /> {appointments.length} appointments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: CalendarCheck, label: "Total",    value: stats.total,    accent: "bg-primary/10 text-primary" },
            { icon: CheckCircle2,  label: "Accepted", value: stats.accepted, accent: "bg-emerald-100 text-emerald-600" },
            { icon: XCircle,       label: "Rejected", value: stats.rejected, accent: "bg-red-100 text-red-500" },
          ].map(({ icon: Icon, label, value, accent }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
                <Icon size={16} />
              </div>
              <p className="text-2xl font-extrabold text-text">{value ?? 0}</p>
              <p className="text-xs text-text/50 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Appointments table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-text">Appointments</h2>
          <p className="text-xs text-text/40 mt-0.5">All appointments handled by this doctor</p>
        </div>

        {appointments.length === 0 ? (
          <div className="py-14 text-center text-text/30 text-sm">No appointments found for this doctor.</div>
        ) : (
          <div className="divide-y divide-border">
            {appointments.map((item) => {
              const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.REQUESTED;
              return (
                <div key={item._id} className="flex items-center justify-between px-5 py-3.5 hover:bg-primary/5 transition">
                  <div>
                    <p className="text-sm font-semibold text-text">{item.patientId?.name || "Patient"}</p>
                    <p className="text-xs text-text/40">{item.date} · {item.time}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${sc.cls}`}>
                    {sc.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;