import { useCallback, useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topbar";
import KpiSummaryRow from "../components/dashboard/kpisummaryrow";
import PerformanceAndEnergyCharts from "../components/dashboard/performanceandenergycharts";
import UnitMonitoringTable from "../components/dashboard/unitmonitoringtable";
import UnitModal from "../components/dashboard/unitmodal";

const API_BASE =
  (import.meta.env.VITE_API_ORIGIN || "http://localhost:4000") + "/api/units";

export default function DashboardPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("overview");
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const loadUnits = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch units");
      setUnits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  const filteredUnits = useMemo(() => {
    const q = search.trim().toLowerCase();
    return units.filter((u) => {
      const matchesStatus =
        statusFilter === "all" || (u.status || "").toLowerCase() === statusFilter;
      const matchesText =
        !q ||
        (u.unit_code || "").toLowerCase().includes(q) ||
        (u.location || "").toLowerCase().includes(q) ||
        (u.name || "").toLowerCase().includes(q);
      return matchesStatus && matchesText;
    });
  }, [units, search, statusFilter]);

  const hasAlert = useMemo(
    () =>
      units.some((u) => ["offline", "alert"].includes((u.status || "").toLowerCase())),
    [units]
  );

  async function handleSaveUnit(values) {
    setSaving(true);
    setError("");
    const isEdit = Boolean(editingUnit?.id);
    const url = isEdit ? `${API_BASE}/${editingUnit.id}` : API_BASE;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save unit");

      if (isEdit) {
        setUnits((prev) => prev.map((u) => (u.id === editingUnit.id ? data : u)));
      } else {
        setUnits((prev) => [data, ...prev]);
      }
      setModalOpen(false);
      setEditingUnit(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteUnit(id) {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete unit");
      setUnits((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="wz-layout">
      <Sidebar
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        hasAlert={hasAlert}
        user={user}
        onLogout={onLogout}
      />

      <main className="wz-main">
        <TopBar
          onRefresh={loadUnits}
          onAddUnit={() => {
            setEditingUnit(null);
            setModalOpen(true);
          }}
          loading={loading}
        />

        {error && (
          <div className="wz-error-banner" role="alert">
            <span>{error}</span>
            <button
              type="button"
              className="wz-btn wz-btn-ghost wz-btn-sm"
              onClick={() => setError("")}
            >
              Dismiss
            </button>
          </div>
        )}

        <KpiSummaryRow units={units} />

        <PerformanceAndEnergyCharts />

        <UnitMonitoringTable
          units={filteredUnits}
          loading={loading}
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
          onEditUnit={(unit) => {
            setEditingUnit(unit);
            setModalOpen(true);
          }}
          onDeleteUnit={handleDeleteUnit}
        />
      </main>

      <UnitModal
        isOpen={modalOpen}
        initialUnit={editingUnit}
        onClose={() => {
          if (!saving) {
            setModalOpen(false);
            setEditingUnit(null);
          }
        }}
        onSave={handleSaveUnit}
        saving={saving}
      />
    </div>
  );
}