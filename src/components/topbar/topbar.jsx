import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function formatClockParts(now) {
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return { time, date };
}

export default function TopBar({ onRefresh, onAddUnit, loading }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(timer);
  }, []);

  const { time, date } = formatClockParts(now);

  return (
    <header className="wz-topbar">
      <div className="wz-topbar-left">
        <div className="wz-clock-pill">
          <Clock size={17} color="#007a68" />
          <strong>{time}</strong>
          <span>{date}</span>
        </div>

        <div className="wz-page-heading">
          <h1>Real Time Monitoring</h1>
          <p>Monitoring critical dimensions in real-time.</p>
        </div>
      </div>

      <div className="wz-topbar-actions">
        <button
          type="button"
          className="wz-btn wz-btn-ghost"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Syncing..." : "Refresh"}
        </button>
        <button
          type="button"
          className="wz-btn wz-btn-primary"
          onClick={onAddUnit}
        >
          + Add Unit
        </button>
      </div>
    </header>
  );
}