import "./Register.css";

function Register({ onRegister, onLogin }) {
  return (
    <div className="register-page">

      <div className="register-container">

        <h1>Hamara Saathi</h1>

        <p className="register-tagline">
          YOUR DIGITAL SAATHI 🤝
        </p>

        <div className="register-card">

          <h2>Create Your Account</h2>

          <p className="register-subtitle">
            Register to use Hamara Saathi
          </p>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter your mobile number"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button
            className="register-main-button"
            onClick={onRegister}
          >
            Create Account →
          </button>

          <p className="login-question">
            Already have an account?
          </p>

          <button
            className="back-login-button"
            onClick={onLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;