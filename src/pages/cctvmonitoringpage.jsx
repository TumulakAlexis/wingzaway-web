import { useState } from "react";
import { Video, WifiOff } from "lucide-react";
import "../styles/dashboard.css";
import Sidebar from "../components/sidebar/sidebar";

const INITIAL_CAMERAS = [
  { id: "CAM-01", name: "Area-A Main Gate", location: "Area-A", online: true },
  { id: "CAM-02", name: "Area-B Feeder Panel", location: "Area-B", online: true },
  { id: "CAM-03", name: "Area-C Perimeter", location: "Area-C", online: false },
  { id: "CAM-04", name: "Control Enclosure", location: "Substation", online: true },
];

export default function CctvMonitoringPage({ user, onLogout }) {
  const [selectedCamId, setSelectedCamId] = useState(INITIAL_CAMERAS[0].id);
  const activeCam =
    INITIAL_CAMERAS.find((c) => c.id === selectedCamId) || INITIAL_CAMERAS[0];

  return (
    <div className="wz-layout">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="wz-main">
        <header className="wz-topbar">
          <div className="wz-page-heading">
            <h1>CCTV Monitoring</h1>
            <p>Live camera feeds paired with Wingzaway field sites.</p>
          </div>

          <div className="wz-topbar-actions">
            <span className="wz-clock-pill">
              <Video size={16} color="#007a68" />
              <strong>{activeCam.id}</strong>
              <span>{activeCam.name}</span>
            </span>
          </div>
        </header>

        <section className="wz-card">
          <h2 className="wz-card-title">Camera Feeds</h2>
          <p className="wz-card-subtitle">
            Select a camera slot to inspect stream status or attach your stream URL.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {INITIAL_CAMERAS.map((cam) => {
              const isSelected = cam.id === selectedCamId;
              return (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCamId(cam.id)}
                  style={{
                    border: isSelected
                      ? "2px solid #007a68"
                      : "1.5px solid #cbd5e1",
                    borderRadius: 12,
                    padding: "0.9rem",
                    background: "#f8faf9",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: 150,
                      borderRadius: 8,
                      background: "#0f2421",
                      color: "#d7f1ec",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {cam.online ? (
                      <>
                        <Video size={26} color="#00a88f" />
                        <span style={{ fontSize: "0.8rem" }}>
                          Stream Ready ({cam.id})
                        </span>
                      </>
                    ) : (
                      <>
                        <WifiOff size={26} color="#ef4444" />
                        <span style={{ fontSize: "0.8rem", color: "#fca5a5" }}>
                          Camera Offline
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong>{cam.name}</strong>
                      <div style={{ fontSize: "0.78rem", color: "#5c6b68" }}>
                        {cam.location}
                      </div>
                    </div>
                    <span
                      className={`wz-status-inline ${
                        cam.online ? "wz-status-online" : "wz-status-offline"
                      }`}
                    >
                      {cam.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}