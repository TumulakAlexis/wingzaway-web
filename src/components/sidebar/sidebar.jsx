import { NavLink } from "react-router-dom";
import { Home, FileText, Video, Bell, Settings } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", Icon: Home, end: true },
  { to: "/reports", label: "Reports", Icon: FileText, end: false },
  { to: "/cctv", label: "CCTV Monitoring", Icon: Video, end: false },
];

export default function Sidebar({ hasAlert, user, onLogout }) {
  const initials = (user?.name || user?.email || "WZ")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="wz-sidebar" aria-label="Primary navigation">
      <div className="wz-sidebar-top">
        <button
          type="button"
          className="wz-avatar-btn"
          title={onLogout ? "Sign out" : "Profile"}
          onClick={onLogout}
        >
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user?.name || "User"} />
          ) : (
            initials
          )}
        </button>
      </div>

      <nav className="wz-sidebar-nav">
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `wz-nav-btn ${isActive ? "is-active" : ""}`
            }
          >
            <Icon size={20} strokeWidth={2.1} />
          </NavLink>
        ))}
      </nav>

      <div className="wz-sidebar-bottom">
        <NavLink
          to="/reports"
          className="wz-nav-btn"
          title="Notifications & Logs"
          aria-label="Notifications & Logs"
        >
          <Bell size={20} strokeWidth={2} />
          {hasAlert && <span className="wz-notif-dot" />}
        </NavLink>

        <button
          type="button"
          className="wz-nav-btn"
          title="Settings"
          aria-label="Settings"
          onClick={() => {}}
        >
          <Settings size={20} strokeWidth={2} />
        </button>

        <div className="wz-brand-mark" title="Wingzaway">
          W
        </div>
      </div>
    </aside>
  );
}