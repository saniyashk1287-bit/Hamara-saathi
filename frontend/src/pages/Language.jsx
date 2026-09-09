import "./Language.css";
import logo from "../assets/hamara-saathi-logo.png";

function Language({ onLanguageSelect }) {

  return (
    <div className="language-page">

      {/* =========================
          BACKGROUND DECORATIONS
      ========================= */}

      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>
      <div className="background-circle circle-three"></div>


      {/* =========================
          HEADER
      ========================= */}

      <header className="language-header">

        <div className="header-logo">
          <img
            src={logo}
            alt="Hamara Saathi Logo"
          />
        </div>

        <div className="header-divider"></div>

        <div className="header-text">
          <span>Your Digital Saathi</span>
          <span className="header-hand">🤝</span>
        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="language-container">

        <div className="language-card">

          {/* Globe */}
          <div className="language-icon">
            🌐
          </div>


          {/* Heading */}
          <h1>
            Choose Your Language
          </h1>

          <p className="language-description">
            Welcome to Hamara Saathi!
            <br />
            Select a language you're comfortable with.
          </p>


          {/* =========================
              LANGUAGE OPTIONS
          ========================= */}

          <div className="language-options">

            {/* ENGLISH */}

            <button
              className="language-button english"
              onClick={() => {
                console.log("English clicked");
                onLanguageSelect("English");
              }}
            >

              <div className="language-symbol">
                A
              </div>

              <div className="language-text">
                <strong>English</strong>
                <span>English</span>
              </div>

              <div className="language-arrow">
                →
              </div>

            </button>


            {/* HINDI */}

            <button
              className="language-button hindi"
              onClick={() => {
                console.log("Hindi clicked");
                onLanguageSelect("Hindi");
              }}
            >

              <div className="language-symbol">
                अ
              </div>

              <div className="language-text">
                <strong>हिंदी</strong>
                <span>Hindi</span>
              </div>

              <div className="language-arrow">
                →
              </div>

            </button>


            {/* MARATHI */}

            <button
              className="language-button marathi"
              onClick={() => {
                console.log("Marathi clicked");
                onLanguageSelect("Marathi");
              }}
            >

              <div className="language-symbol">
                म
              </div>

              <div className="language-text">
                <strong>मराठी</strong>
                <span>Marathi</span>
              </div>

              <div className="language-arrow">
                →
              </div>

            </button>


            {/* TELUGU */}

            <button
              className="language-button telugu"
              onClick={() => {
                console.log("Telugu clicked");
                onLanguageSelect("Telugu");
              }}
            >

              <div className="language-symbol">
                తె
              </div>

              <div className="language-text">
                <strong>తెలుగు</strong>
                <span>Telugu</span>
              </div>

              <div className="language-arrow">
                →
              </div>

            </button>

          </div>


          {/* Divider */}

          <div className="language-divider"></div>


          {/* Note */}

          <p className="language-note">
            💡 You can change your language anytime from your profile.
          </p>

        </div>


        {/* Bottom Text */}

        <p className="bottom-text">
          Simple • Secure • For Everyone
        </p>

      </main>

    </div>
  );
}

export default Language;