import { useState } from "react";
import "../styles/dashboard.css";
import Sidebar from "../components/sidebar/sidebar";

const SAMPLE_REPORTS = [
  {
    id: "RPT-01",
    title: "AC Power & Outage Summary",
    period: "November 2026",
    source: "Azure SQL (dbo.units)",
    status: "Ready",
  },
  {
    id: "RPT-02",
    title: "Monthly Unit Uptime & Voltage Report",
    period: "November 2026",
    source: "Wingzaway Telemetry",
    status: "Ready",
  },
];

export default function ReportsPage({ user, onLogout }) {
  const [selectedRange, setSelectedRange] = useState("7d");

  return (
    <div className="wz-layout">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="wz-main">
        <header className="wz-topbar">
          <div className="wz-page-heading">
            <h1>Reports</h1>
            <p>Export and review Wingzaway unit status and power reports.</p>
          </div>

          <div className="wz-topbar-actions">
            <select
              className="wz-select"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              aria-label="Report time range"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </header>

        <section className="wz-card">
          <h2 className="wz-card-title">Available Reports ({selectedRange})</h2>
          <p className="wz-card-subtitle">
            Connect report export endpoints from your Express API when ready.
          </p>

          <div className="wz-table-wrap">
            <table className="wz-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Report Name</th>
                  <th>Period</th>
                  <th>Data Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_REPORTS.map((rpt) => (
                  <tr key={rpt.id}>
                    <td>{rpt.id}</td>
                    <td>{rpt.title}</td>
                    <td>{rpt.period}</td>
                    <td>{rpt.source}</td>
                    <td>
                      <span className="wz-status-inline wz-status-online">
                        {rpt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}