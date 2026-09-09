import "./Login.css";
import logo from "../assets/hamara-saathi-logo.png";

function Login({ onLogin, onRegister }) {
  return (
    <div className="login-page">

      <div className="login-container">

        {/* =========================
            HAMARA SAATHI BRAND
        ========================= */}

        <div className="brand-section">

          <img
            src={logo}
            alt="Hamara Saathi Logo"
            className="login-logo"
          />

          <h1>Hamara Saathi</h1>

          <p className="tagline">
            YOUR DIGITAL SAATHI 🤝
          </p>

        </div>


        {/* =========================
            LOGIN CARD
        ========================= */}

        <div className="login-card">

          {/* Welcome Icon */}

          <div className="welcome-icon">
            👋
          </div>


          {/* Heading */}

          <h2>
            Welcome Back!
          </h2>

          <p className="login-subtitle">
            Login to continue to Hamara Saathi
          </p>


          {/* =========================
              EMAIL / MOBILE
          ========================= */}

          <div className="input-group">

            <label>
              Email / Mobile Number
            </label>

            <input
              type="text"
              placeholder="Enter your email or mobile number"
            />

          </div>


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
            />

          </div>


          {/* =========================
              LOGIN BUTTON
          ========================= */}

          <button
            className="login-button"
            onClick={onLogin}
          >
            Login →
          </button>


          {/* =========================
              REGISTER
          ========================= */}

          <p className="register-question">
            Don't have an account?
          </p>

          <button
            className="register-button"
            onClick={onRegister}
          >
            Create New Account
          </button>

        </div>


        {/* =========================
            FOOTER
        ========================= */}

        <p className="login-footer">
          Simple • Secure • For Everyone
        </p>

      </div>

    </div>
  );
}

export default Login;