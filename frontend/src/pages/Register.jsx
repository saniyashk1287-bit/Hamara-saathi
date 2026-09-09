import { useState } from "react";
import "./Register.css";

function Register({ onRegister, onLogin }) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegister() {

    setMessage("");
    setMessageType("");


    // Check empty fields

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      setMessage("Please fill in all the fields.");
      setMessageType("error");

      return;
    }


    // Check password

    if (password !== confirmPassword) {

      setMessage("Passwords do not match.");
      setMessageType("error");

      return;
    }


    try {

      setLoading(true);


      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fullName,
            email,
            phone,
            password
          })
        }
      );


      const data = await response.json();


      // Registration failed

      if (!response.ok) {

        setMessage(
          data.message || "Registration failed."
        );

        setMessageType("error");

        return;
      }


      // Registration successful

      setMessage(
        "Account created successfully!"
      );

      setMessageType("success");


      // Move to language page

      setTimeout(() => {

        onRegister(data.user);

      }, 800);


    } catch (error) {

      console.error(
        "Registration error:",
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

    <div className="register-page">

      <div className="register-container">


        {/* =========================
            BRAND
        ========================= */}

        <div className="register-brand">

          <h1>
            Hamara Saathi
          </h1>

          <p>
            YOUR DIGITAL SAATHI 🤝
          </p>

        </div>


        {/* =========================
            REGISTER CARD
        ========================= */}

        <div className="register-card">

          <h2>
            Create Your Account
          </h2>

          <p className="register-subtitle">
            Join Hamara Saathi today
          </p>


          {/* FULL NAME */}

          <div className="register-input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          </div>


          {/* EMAIL */}

          <div className="register-input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* PHONE */}

          <div className="register-input-group">

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>


          {/* PASSWORD */}

          <div className="register-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="register-input-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          {/* MESSAGE */}

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


          {/* REGISTER BUTTON */}

          <button
            className="register-main-button"
            onClick={handleRegister}
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account →"
            }

          </button>


          {/* LOGIN */}

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