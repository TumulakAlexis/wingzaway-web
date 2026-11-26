import { useState } from "react";
import { Lottie } from "lottie-react";
import "./loginpage.css";

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logoMissing, setLogoMissing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess({ username: username.trim() });
    } else {
      alert(`Signing in as ${username.trim()}`);
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="brand-logo-wrap">
          {!logoMissing ? (
            <img
              src="/logo-placeholder.png"
              alt="Wingzaway Logo"
              className="brand-logo-img"
              onError={() => setLogoMissing(true)}
            />
          ) : (
            <div className="placeholder-fallback placeholder-fallback--logo">
              logo-placeholder.png
            </div>
          )}
        </div>

        <p className="brand-tagline">“Innovation in bird control”</p>
      </header>

      <main className="login-main">
        {/* Left Illustration */}
        <section className="illustration-panel" aria-label="Brand illustration">
          <Lottie
            src="/lottie.json"
            loop
            autoplay
            style={{ width: "100%", maxWidth: 520, height: 420 }}
          />
        </section>

        {/* Right Login Form */}
        <section className="form-panel">
          <h1 className="login-title">Welcome!</h1>
          <p className="login-subtitle">Sign in to your account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="input-pill">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
              </svg>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label className="input-pill">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            {error && <p className="login-error">{error}</p>}

            <div className="forgot-link-row">
              <button
                type="button"
                className="forgot-link"
                onClick={() => alert("Forgot password flow coming next")}
              >
                Forgot password?
              </button>
            </div>

            <div className="button-row">
              <button type="submit" className="btn-pill btn-primary">
                Sign In
              </button>
              <button
                type="button"
                className="btn-pill btn-outline"
                onClick={() => alert("Sign Up view coming next")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}