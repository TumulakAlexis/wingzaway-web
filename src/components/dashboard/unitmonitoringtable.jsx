import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function UnitMonitoringTable({
  units,
  loading,
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onEditUnit,
  onDeleteUnit,
}) {
  return (
    <section className="wz-card" aria-label="Unit Monitoring">
      <div className="wz-table-header-row">
        <h2 className="wz-card-title">Unit Monitoring</h2>

        <div className="wz-table-controls">
          <input
            type="text"
            className="wz-input"
            placeholder="Filter by ID or location..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <select
            className="wz-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="alert">Alert</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#5c6b68", fontSize: "0.9rem" }}>Loading units...</p>
      ) : units.length === 0 ? (
        <p style={{ color: "#5c6b68", fontSize: "0.9rem" }}>
          No units to display yet. Click <strong>+ Add Unit</strong> above.
        </p>
      ) : (
        <div className="wz-table-wrap">
          <table className="wz-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Voltage (V)</th>
                <th>Current (A)</th>
                <th>Power (W)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => {
                const st = (unit.status || "offline").toLowerCase();
                const isOffline = st === "offline";
                const isOnline = st === "online";

                const voltage = isOffline ? 0 : unit.voltage ?? "230.4";
                const current = isOffline ? 0 : unit.current_amps ?? "1.52";
                const power = isOffline ? 0 : unit.power_watts ?? "30.6";

                return (
                  <tr key={unit.id} className={isOffline ? "wz-row-alert" : ""}>
                    <td>{unit.unit_code}</td>
                    <td>{unit.location || unit.name || "—"}</td>
                    <td>
                      <span
                        className={`wz-status-inline ${
                          isOnline
                            ? "wz-status-online"
                            : isOffline
                            ? "wz-status-offline"
                            : "wz-status-alert"
                        }`}
                      >
                        {isOnline ? (
                          <CheckCircle2 size={16} />
                        ) : isOffline ? (
                          <XCircle size={16} />
                        ) : (
                          <AlertTriangle size={16} />
                        )}
                        {unit.status}
                      </span>
                    </td>
                    <td>{voltage}</td>
                    <td>{current}</td>
                    <td>{power}</td>
                    <td>
                      <div className="wz-actions-cell">
                        <button
                          type="button"
                          className="wz-btn wz-btn-ghost wz-btn-sm"
                          onClick={() => onEditUnit(unit)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="wz-btn wz-btn-danger wz-btn-sm"
                          onClick={() => onDeleteUnit(unit.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}