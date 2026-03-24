const ToolsView = ({ tools, setTools }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    model: "",
    type: "X-Ray",
    status: "Operational",
    location: "",
  });

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase()),
  );

  const typeIconMap = {
    "X-Ray": "xray",
    MRI: "mri",
    "CT Scan": "ct",
    Ultrasound: "ultrasound",
    ECG: "ecg",
  };

  const handleAdd = () => {
    if (!form.name || !form.model) return;
    setTools((prev) => [
      ...prev,
      { ...form, id: Date.now(), icon: typeIconMap[form.type] || "tools" },
    ]);
    setForm({
      name: "",
      model: "",
      type: "X-Ray",
      status: "Operational",
      location: "",
    });
    setShowModal(false);
  };

  const handleDelete = (id) =>
    setTools((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2
            className="text-xl font-bold text-[#222]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Medical Tools
          </h2>
          <p className="text-sm text-[#777] mt-0.5">
            {tools.length} devices registered
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]">
              <Icon d={icons.search} size={15} />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6a5acd]/30 focus:border-[#6a5acd] w-52 transition-all"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "#6a5acd" }}
          >
            <Icon d={icons.plus} size={15} />
            Add Tool
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#ede9ff] flex items-center justify-center">
                <Icon
                  d={icons[t.icon] || icons.tools}
                  size={20}
                  stroke="#6a5acd"
                />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-[#6a5acd] hover:bg-[#ede9ff] transition-colors">
                  <Icon d={icons.edit} size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Icon d={icons.trash} size={13} />
                </button>
              </div>
            </div>
            <div
              className="mb-1 font-semibold text-[#222] text-sm"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.name}
            </div>
            <div className="text-xs text-[#777] mb-3">{t.model}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-0.5 rounded-lg font-medium bg-[#ede9ff] text-[#6a5acd]">
                {t.type}
              </span>
              <Badge status={t.status} />
            </div>
            <div className="mt-3 pt-3 border-t border-[#f0f0f0] text-xs text-[#777] flex items-center gap-1.5">
              <Icon
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                size={12}
              />
              {t.location}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Medical Tool" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Field label="Tool Name">
              <Input
                placeholder="e.g. X-Ray Machine"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </Field>
            <Field label="Model">
              <Input
                placeholder="e.g. Siemens AXIOM"
                value={form.model}
                onChange={(e) =>
                  setForm((f) => ({ ...f, model: e.target.value }))
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Type">
                <Select
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                >
                  {toolTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option>Operational</option>
                  <option>Maintenance</option>
                </Select>
              </Field>
            </div>
            <Field label="Location / Room">
              <Input
                placeholder="e.g. Room 101"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
              />
            </Field>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm font-medium text-[#777] hover:bg-[#f8f9fb] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "#6a5acd" }}
              >
                Add Tool
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ToolsView