import { useEffect, useState } from "react";

const EMPTY_UNIT = {
  unit_code: "",
  name: "",
  location: "",
  status: "online",
};

export default function UnitModal({ isOpen, initialUnit, onClose, onSave, saving }) {
  const [form, setForm] = useState(EMPTY_UNIT);

  useEffect(() => {
    if (initialUnit) {
      setForm({
        unit_code: initialUnit.unit_code || "",
        name: initialUnit.name || "",
        location: initialUnit.location || "",
        status: initialUnit.status || "online",
      });
    } else {
      setForm(EMPTY_UNIT);
    }
  }, [initialUnit, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      name: form.name.trim() || form.unit_code.trim(),
    });
  }

  return (
    <div className="wz-modal-backdrop" role="dialog" aria-modal="true">
      <div className="wz-modal-card">
        <h3 style={{ marginTop: 0, color: "#005a4e" }}>
          {initialUnit ? `Edit ${initialUnit.unit_code}` : "Add Monitoring Unit"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="wz-modal-field">
            <label htmlFor="unit_code">Unit / User ID *</label>
            <input
              id="unit_code"
              name="unit_code"
              className="wz-input"
              placeholder="e.g. WD-2000012"
              value={form.unit_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="wz-modal-field">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              name="location"
              className="wz-input"
              placeholder="e.g. Area-A"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="wz-modal-field">
            <label htmlFor="name">Unit Label</label>
            <input
              id="name"
              name="name"
              className="wz-input"
              placeholder="e.g. Feeder Node 1"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="wz-modal-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="wz-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="online">online</option>
              <option value="offline">offline</option>
              <option value="alert">alert</option>
            </select>
          </div>

          <div className="wz-modal-footer">
            <button type="button" className="wz-btn wz-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="wz-btn wz-btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}