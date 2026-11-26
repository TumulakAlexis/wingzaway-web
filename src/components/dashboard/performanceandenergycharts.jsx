import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DEFAULT_ACTIVITY_SERIES = [
  { period: "Jul", baseline: 18, active: 35, peak: 12 },
  { period: "Oct", baseline: 32, active: 68, peak: 20 },
  { period: "2024", baseline: 46, active: 110, peak: 28 },
  { period: "Apr", baseline: 52, active: 165, peak: 34 },
  { period: "Oct ", baseline: 60, active: 225, peak: 45 },
  { period: "2026", baseline: 68, active: 295, peak: 62 },
  { period: "Now", baseline: 75, active: 345, peak: 50 },
];

const DEFAULT_ALARM_WEEKLY = [
  { day: "M", events: 42 },
  { day: "T", events: 31 },
  { day: "W", events: 24 },
  { day: "T ", events: 46 },
  { day: "F", events: 38 },
  { day: "S", events: 11 },
  { day: "S ", events: 6 },
];

const DEFAULT_VOLTAGE_TREND = [
  { slot: "1", vMain: 224, vAux: 218 },
  { slot: "2", vMain: 228, vAux: 221 },
  { slot: "3", vMain: 235, vAux: 223 },
  { slot: "4", vMain: 232, vAux: 225 },
  { slot: "5", vMain: 239, vAux: 229 },
  { slot: "6", vMain: 236, vAux: 231 },
];

const DEFAULT_MONTHLY_ENERGY = [
  { month: "Jan", kwh: 4 },
  { month: "Feb", kwh: 8 },
  { month: "Mar", kwh: 6 },
  { month: "Apr", kwh: 12 },
  { month: "May", kwh: 9 },
  { month: "Jun", kwh: 15 },
  { month: "Jul", kwh: 11 },
  { month: "Aug", kwh: 14 },
  { month: "Sep", kwh: 13 },
  { month: "Oct", kwh: 18 },
  { month: "Nov", kwh: 16 },
  { month: "Dec", kwh: 20 },
];

export default function PerformanceAndEnergyCharts({
  reportingPeriod = "November 26, 2026",
  energyData = DEFAULT_MONTHLY_ENERGY,
}) {
  return (
    <section className="wz-charts-grid" aria-label="Performance and energy charts">
      {/* Left Card: Monthly Performance Report */}
      <div className="wz-card">
        <h2 className="wz-card-title">Monthly Performance Report</h2>
        <p className="wz-card-subtitle">
          Reporting Period: <strong>{reportingPeriod}</strong>
        </p>

        <div className="wz-perf-split">
          <div>
            <div className="wz-mini-chart-label">Telemetry & Load Trend</div>
            <div className="wz-main-chart-box" style={{ height: 210 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEFAULT_ACTIVITY_SERIES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={34} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.85}
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stackId="1"
                    stroke="#eab308"
                    fill="#facc15"
                    fillOpacity={0.85}
                  />
                  <Area
                    type="monotone"
                    dataKey="peak"
                    stackId="1"
                    stroke="#f43f5e"
                    fill="#fb7185"
                    fillOpacity={0.85}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <div className="wz-mini-chart-label">Alarm & Event Summary</div>
              <div className="wz-mini-chart-box">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEFAULT_ALARM_WEEKLY}>
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="events" fill="#3b5bdb" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="wz-mini-chart-box">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DEFAULT_VOLTAGE_TREND}>
                    <XAxis dataKey="slot" tick={{ fontSize: 10 }} />
                    <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} width={30} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="vMain"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="vAux"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Card: Energy Consumption */}
      <div className="wz-card">
        <h2 className="wz-card-title">Energy Consumption</h2>
        <p className="wz-card-subtitle">Monthly AC load & telemetry output</p>

        <div className="wz-bar-chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={30} />
              <Tooltip />
              <Bar dataKey="kwh" fill="#3b5bdb" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}