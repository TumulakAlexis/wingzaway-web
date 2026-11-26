export default function KpiSummaryRow({ units }) {
  const totalUnits = units.length;
  const onlineCount = units.filter(
    (u) => (u.status || "").toLowerCase() === "online"
  ).length;
  const offlineCount = units.filter(
    (u) => (u.status || "").toLowerCase() === "offline"
  ).length;
  const alertsCount = units.filter(
    (u) => (u.status || "").toLowerCase() === "alert"
  ).length;

  let healthLabel = "Excellent";
  if (totalUnits === 0) {
    healthLabel = "Standby";
  } else if (alertsCount > 0 || offlineCount / totalUnits > 0.35) {
    healthLabel = "Attention";
  } else if (offlineCount > 0) {
    healthLabel = "Good";
  }

  return (
    <section className="wz-kpi-row" aria-label="Unit status counts">
      <div className="wz-kpi-card is-featured">
        <div className="wz-kpi-label">Total Units</div>
        <div className="wz-kpi-value is-total">{totalUnits}</div>
      </div>

      <div className="wz-kpi-card">
        <div className="wz-kpi-label">Online</div>
        <div className="wz-kpi-value is-online">{onlineCount}</div>
      </div>

      <div className="wz-kpi-card">
        <div className="wz-kpi-label">Offline</div>
        <div className="wz-kpi-value is-offline">{offlineCount}</div>
      </div>

      <div className="wz-kpi-card">
        <div className="wz-kpi-label">Alerts</div>
        <div className="wz-kpi-value is-alerts">{alertsCount}</div>
      </div>

      <div className="wz-kpi-card">
        <div className="wz-kpi-label">System Health</div>
        <div className="wz-kpi-value is-health">{healthLabel}</div>
      </div>
    </section>
  );
}