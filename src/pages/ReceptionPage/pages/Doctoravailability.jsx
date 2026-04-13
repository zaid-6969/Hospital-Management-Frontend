import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../../../redux/Slices/doctorSlice";
import {
  Stethoscope,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const PAGE_SIZE = 8;

const DoctorAvailability = () => {
  const dispatch = useDispatch();
  const { list: doctors, loading } = useSelector((s) => s.doctors);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "available" | "unavailable"
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const filtered = doctors.filter((doc) => {
    const matchSearch =
      doc.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(search.toLowerCase());
    const isAvailable = doc.isAvailable ?? true;
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "available"
        ? isAvailable
        : !isAvailable;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const availableCount = doctors.filter((d) => d.isAvailable ?? true).length;
  const unavailableCount = doctors.length - availableCount;

  return (
    <div className="p-4 sm:p-6" style={{ color: "var(--text)" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black flex items-center gap-3">
          <Stethoscope className="text-purple-600" size={28} />
          Doctor Availability
        </h1>
        <p className="text-sm mt-1 opacity-50">
          Live availability status for all registered doctors.
        </p>
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Total Doctors", value: doctors.length, color: "rgba(106,90,205,0.12)", text: "#6a5acd" },
          { label: "Available",     value: availableCount,   color: "rgba(34,197,94,0.12)",  text: "#16a34a" },
          { label: "Unavailable",   value: unavailableCount, color: "rgba(239,68,68,0.12)",  text: "#dc2626" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: s.color, color: s.text }}
          >
            <span className="text-lg font-extrabold">{s.value}</span>
            <span className="opacity-70">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialization…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: "all",         label: "All"         },
            { key: "available",   label: "Available"   },
            { key: "unavailable", label: "Unavailable" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                filterStatus === f.key
                  ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white", boxShadow: "0 4px 12px rgba(106,90,205,.25)" }
                  : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
          <Loader2 size={32} className="animate-spin text-purple-500" />
          <p className="text-sm opacity-50">Loading doctors…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
          <Stethoscope size={36} className="opacity-20" />
          <p className="text-sm opacity-50">No doctors match your search.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map((doc) => {
              const isAvailable = doc.isAvailable ?? true;
              return (
                <div
                  key={doc._id}
                  className="rounded-2xl p-4 flex flex-col gap-3 transition-all hover:shadow-lg"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  {/* Avatar + status badge */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      {doc.image?.url ? (
                        <img
                          src={doc.image.url}
                          alt={doc.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-extrabold"
                          style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
                        >
                          {doc.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "DR"}
                        </div>
                      )}
                      <span
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2"
                        style={{
                          background: isAvailable ? "#22c55e" : "#ef4444",
                          borderColor: "var(--card)",
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{doc.name}</p>
                      {doc.specialization && (
                        <p className="text-xs truncate opacity-50">{doc.specialization}</p>
                      )}
                    </div>
                  </div>

                  {/* Status badge */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={
                      isAvailable
                        ? { background: "rgba(34,197,94,0.1)", color: "#16a34a" }
                        : { background: "rgba(239,68,68,0.1)", color: "#dc2626" }
                    }
                  >
                    {isAvailable
                      ? <CheckCircle2 size={13} />
                      : <XCircle size={13} />}
                    {isAvailable ? "Available" : "Unavailable"}
                  </div>

                  {/* Today's slots */}
                  {doc.availability?.length > 0 && (() => {
                    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
                    const todaySlots = doc.availability.find(
                      (a) => a.day?.toLowerCase() === today.toLowerCase()
                    );
                    return todaySlots?.slots?.length > 0 ? (
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                          Today's Slots
                        </p>
                        {todaySlots.slots.map((slot, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg"
                            style={{ background: "rgba(106,90,205,0.08)", color: "#6a5acd" }}
                          >
                            <Clock size={11} />
                            {slot.start} — {slot.end}
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <p className="text-xs opacity-40">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} doctors
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all disabled:opacity-30"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all"
                    style={
                      p === page
                        ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white", boxShadow: "0 4px 12px rgba(106,90,205,.3)" }
                        : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }
                    }
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all disabled:opacity-30"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorAvailability;