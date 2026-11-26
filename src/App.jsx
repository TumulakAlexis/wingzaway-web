import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginpage.jsx";
import DashboardPage from "./pages/dashboardpage.jsx";
import ReportsPage from "./pages/reportspage.jsx";
import CctvMonitoringPage from "./pages/cctvmonitoringpage.jsx";

export default function App() {
  const [user, setUser] = useState({ name: "Wingzaway Operator" });

  if (!user) {
    return <LoginPage onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage user={user} onLogout={() => setUser(null)} />}
        />
        <Route
          path="/reports"
          element={<ReportsPage user={user} onLogout={() => setUser(null)} />}
        />
        <Route
          path="/cctv"
          element={<CctvMonitoringPage user={user} onLogout={() => setUser(null)} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}