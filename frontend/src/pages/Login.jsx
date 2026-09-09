import { useState } from "react";
import "./Login.css";
import logo from "../assets/hamara-saathi-logo.png";

function Login({ onLogin, onRegister }) {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin() {

    setMessage("");
    setMessageType("");


    // =========================
    // CHECK EMPTY FIELDS
    // =========================

    const loginIdentifier = identifier.trim();

    if (!loginIdentifier || !password) {

      setMessage(
        "Please enter your email/mobile number and password."
      );

      setMessageType("error");

      return;
    }


    try {

      setLoading(true);


      // =========================
      // LOGIN API
      // =========================

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            // IMPORTANT:
            // Backend expects loginInput

            loginInput: loginIdentifier,

            password: password

          })
        }
      );


      const data = await response.json();


      // =========================
      // LOGIN FAILED
      // =========================

      if (!response.ok) {

        setMessage(
          data.message ||
          "Invalid email/mobile number or password."
        );

        setMessageType("error");

        return;
      }


      // =========================
      // LOGIN SUCCESSFUL
      // =========================

      setMessage(
        "Login successful!"
      );

      setMessageType("success");


      // Send user data to App.jsx

      setTimeout(() => {

        onLogin(data.user);

      }, 500);


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      setMessage(
        "Unable to connect to the server. Please make sure the backend is running."
      );

      setMessageType("error");


    } finally {

      setLoading(false);

    }

  }


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

          <h1>
            Hamara Saathi
          </h1>

          <p className="tagline">
            YOUR DIGITAL SAATHI 🤝
          </p>

        </div>


        {/* =========================
            LOGIN CARD
        ========================= */}

        <div className="login-card">


          {/* WELCOME ICON */}

          <div className="welcome-icon">
            👋
          </div>


          {/* HEADING */}

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

              value={identifier}

              onChange={(e) =>
                setIdentifier(e.target.value)
              }
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

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* =========================
              MESSAGE
          ========================= */}

          {message && (

            <p
              style={{
                color:
                  messageType === "success"
                    ? "green"
                    : "#d32f2f",

                fontSize: "13px",

                textAlign: "center",

                marginTop: "10px"
              }}
            >

              {message}

            </p>

          )}


          {/* =========================
              LOGIN BUTTON
          ========================= */}

          <button
            className="login-button"

            onClick={handleLogin}

            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login →"
            }

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