import { useState, useEffect } from "react";

import "./Profile.css";


function Profile({
  user,
  profile,
  language = "English",
  onComplete,
  onBack
}) {


  // ==========================================
  // TRANSLATIONS
  // ==========================================

  const translations = {


    // ==========================================
    // ENGLISH
    // ==========================================

    English: {

      title: "Complete Your Profile",

      subtitle:
        "Enter and manage your personal details in your Hamara Saathi profile.",

      personal: "Personal Details",

      fullName: "Full Name",

      email: "Email Address",

      phone: "Mobile Number",

      dob: "Date of Birth",

      age: "Age",

      gender: "Gender",

      selectGender: "Select Gender",

      male: "Male",

      female: "Female",

      other: "Other",

      education: "Education",

      occupation: "Occupation",

      category: "Category",

      contact: "Address Details",

      address: "Address",

      city: "City",

      state: "State",

      pincode: "Pincode",

      identity: "Identity Details",

      aadhaar: "Aadhaar Number",

      pan: "PAN Card Number",

      voter: "Voter ID",

      save: "Save & Continue →",

      update: "Save Changes →",

      back: "← Back",

      saving: "Saving...",

      required:
        "Please fill in all the required fields.",

      success:
        "Profile saved successfully!"

    },


    // ==========================================
    // HINDI
    // ==========================================

    Hindi: {

      title: "अपनी प्रोफ़ाइल पूरी करें",

      subtitle:
        "अपने हमरा साथी प्रोफ़ाइल में अपनी जानकारी दर्ज करें और प्रबंधित करें।",

      personal: "व्यक्तिगत जानकारी",

      fullName: "पूरा नाम",

      email: "ईमेल पता",

      phone: "मोबाइल नंबर",

      dob: "जन्म तिथि",

      age: "आयु",

      gender: "लिंग",

      selectGender: "लिंग चुनें",

      male: "पुरुष",

      female: "महिला",

      other: "अन्य",

      education: "शिक्षा",

      occupation: "व्यवसाय",

      category: "श्रेणी",

      contact: "पता विवरण",

      address: "पता",

      city: "शहर",

      state: "राज्य",

      pincode: "पिनकोड",

      identity: "पहचान विवरण",

      aadhaar: "आधार नंबर",

      pan: "पैन कार्ड नंबर",

      voter: "वोटर आईडी",

      save: "सहेजें और आगे बढ़ें →",

      update: "परिवर्तन सहेजें →",

      back: "← वापस",

      saving: "सहेजा जा रहा है...",

      required:
        "कृपया सभी आवश्यक जानकारी भरें।",

      success:
        "प्रोफ़ाइल सफलतापूर्वक सहेजी गई!"

    },


    // ==========================================
    // MARATHI
    // ==========================================

    Marathi: {

      title: "तुमचे प्रोफाइल पूर्ण करा",

      subtitle:
        "तुमच्या हमारा साथी प्रोफाइलमध्ये तुमची माहिती भरा आणि व्यवस्थापित करा.",

      personal: "वैयक्तिक माहिती",

      fullName: "पूर्ण नाव",

      email: "ईमेल पत्ता",

      phone: "मोबाईल नंबर",

      dob: "जन्मतारीख",

      age: "वय",

      gender: "लिंग",

      selectGender: "लिंग निवडा",

      male: "पुरुष",

      female: "स्त्री",

      other: "इतर",

      education: "शिक्षण",

      occupation: "व्यवसाय",

      category: "प्रवर्ग",

      contact: "पत्ता माहिती",

      address: "पत्ता",

      city: "शहर",

      state: "राज्य",

      pincode: "पिनकोड",

      identity: "ओळख तपशील",

      aadhaar: "आधार नंबर",

      pan: "पॅन कार्ड नंबर",

      voter: "मतदार ओळखपत्र",

      save: "जतन करा आणि पुढे जा →",

      update: "बदल जतन करा →",

      back: "← मागे",

      saving: "जतन होत आहे...",

      required:
        "कृपया सर्व आवश्यक माहिती भरा.",

      success:
        "प्रोफाइल यशस्वीरित्या जतन झाले!"

    },


    // ==========================================
    // TELUGU
    // ==========================================

    Telugu: {

      title: "మీ ప్రొఫైల్‌ను పూర్తి చేయండి",

      subtitle:
        "మీ హమారా సాథీ ప్రొఫైల్‌లో మీ వివరాలను నమోదు చేసి నిర్వహించండి.",

      personal: "వ్యక్తిగత వివరాలు",

      fullName: "పూర్తి పేరు",

      email: "ఇమెయిల్ చిరునామా",

      phone: "మొబైల్ నంబర్",

      dob: "పుట్టిన తేదీ",

      age: "వయస్సు",

      gender: "లింగం",

      selectGender: "లింగాన్ని ఎంచుకోండి",

      male: "పురుషుడు",

      female: "స్త్రీ",

      other: "ఇతర",

      education: "విద్య",

      occupation: "వృత్తి",

      category: "వర్గం",

      contact: "చిరునామా వివరాలు",

      address: "చిరునామా",

      city: "నగరం",

      state: "రాష్ట్రం",

      pincode: "పిన్‌కోడ్",

      identity: "గుర్తింపు వివరాలు",

      aadhaar: "ఆధార్ నంబర్",

      pan: "పాన్ కార్డ్ నంబర్",

      voter: "ఓటర్ ఐడి",

      save: "సేవ్ చేసి కొనసాగించండి →",

      update: "మార్పులను సేవ్ చేయండి →",

      back: "← వెనుకకు",

      saving: "సేవ్ అవుతోంది...",

      required:
        "దయచేసి అన్ని అవసరమైన వివరాలను నమోదు చేయండి.",

      success:
        "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!"

    }

  };


  const text =
    translations[language] ||
    translations.English;


  // ==========================================
  // FORM STATES
  // ==========================================

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [education, setEducation] =
    useState("");

  const [occupation, setOccupation] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [aadhaarNumber, setAadhaarNumber] =
    useState("");

  const [panNumber, setPanNumber] =
    useState("");

  const [voterId, setVoterId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // LOAD USER AND SAVED PROFILE DATA
  // ==========================================

  useEffect(() => {

    setFullName(
      profile?.full_name ||
      user?.full_name ||
      ""
    );


    setEmail(
      profile?.email ||
      user?.email ||
      ""
    );


    setPhone(
      profile?.phone ||
      user?.phone ||
      ""
    );


    setDateOfBirth(
      profile?.date_of_birth
        ? String(profile.date_of_birth).split("T")[0]
        : ""
    );


    setAge(
      profile?.age || ""
    );


    setGender(
      profile?.gender || ""
    );


    setEducation(
      profile?.education || ""
    );


    setOccupation(
      profile?.occupation || ""
    );


    setCategory(
      profile?.category || ""
    );


    setAddress(
      profile?.address || ""
    );


    setCity(
      profile?.city || ""
    );


    setState(
      profile?.state || ""
    );


    setPincode(
      profile?.pincode || ""
    );


    setAadhaarNumber(
      profile?.aadhaar_number || ""
    );


    setPanNumber(
      profile?.pan_number || ""
    );


    setVoterId(
      profile?.voter_id || ""
    );


  }, [profile, user]);


  // ==========================================
  // SAVE PROFILE
  // ==========================================

  async function handleSave() {

    setMessage("");

    setMessageType("");


    // Required validation

    if (

      !fullName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !age ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !pincode

    ) {

      setMessage(
        text.required
      );

      setMessageType(
        "error"
      );

      return;

    }


    try {

      setLoading(true);


      const response =
        await fetch(

          "http://localhost:5000/api/profile",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },


            body: JSON.stringify({

              userId:
                user?.user_id,

              fullName,

              email,

              phone,

              dateOfBirth,

              age,

              gender,

              education,

              occupation,

              category,

              address,

              city,

              state,

              pincode,

              aadhaarNumber,

              panNumber,

              voterId

            })

          }

        );


      const data =
        await response.json();


      if (!response.ok) {

        setMessage(

          data.message ||
          "Unable to save profile."

        );


        setMessageType(
          "error"
        );


        return;

      }


      setMessage(
        text.success
      );


      setMessageType(
        "success"
      );


      // Updated profile object

      const savedProfile =
        data.profile || {

          user_id:
            user?.user_id,

          full_name:
            fullName,

          email:
            email,

          phone:
            phone,

          date_of_birth:
            dateOfBirth,

          age:
            age,

          gender:
            gender,

          education:
            education,

          occupation:
            occupation,

          category:
            category,

          address:
            address,

          city:
            city,

          state:
            state,

          pincode:
            pincode,

          aadhaar_number:
            aadhaarNumber,

          pan_number:
            panNumber,

          voter_id:
            voterId

        };


      setTimeout(() => {

        if (onComplete) {

          onComplete(
            savedProfile
          );

        }

      }, 500);


    } catch (error) {

      console.error(
        "Profile error:",
        error
      );


      setMessage(
        "Unable to connect to the server."
      );


      setMessageType(
        "error"
      );


    } finally {

      setLoading(false);

    }

  }


  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (

    <div className="profile-page">


      <div className="profile-container">


        {/* BRAND */}

        <div className="profile-brand">

          <h1>
            Hamara Saathi
          </h1>

          <p>
            YOUR DIGITAL SAATHI 🤝
          </p>

        </div>


        {/* PROFILE CARD */}

        <div className="profile-card">


          <h2>
            {text.title}
          </h2>


          <p className="profile-subtitle">
            {text.subtitle}
          </p>


          {/* ======================================
              PERSONAL DETAILS
          ====================================== */}

          <div className="profile-section">


            <h3>
              👤 {text.personal}
            </h3>


            <div className="profile-grid">


              <div className="profile-input-group">

                <label>
                  {text.fullName}
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.email}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.phone}
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.dob}
                </label>

                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) =>
                    setDateOfBirth(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.age}
                </label>

                <input
                  type="number"
                  value={age}
                  onChange={(e) =>
                    setAge(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.gender}
                </label>

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    {text.selectGender}
                  </option>

                  <option value="Male">
                    {text.male}
                  </option>

                  <option value="Female">
                    {text.female}
                  </option>

                  <option value="Other">
                    {text.other}
                  </option>

                </select>

              </div>


              <div className="profile-input-group">

                <label>
                  {text.education}
                </label>

                <input
                  type="text"
                  value={education}
                  onChange={(e) =>
                    setEducation(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.occupation}
                </label>

                <input
                  type="text"
                  value={occupation}
                  onChange={(e) =>
                    setOccupation(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.category}
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                />

              </div>


            </div>

          </div>


          {/* ======================================
              ADDRESS DETAILS
          ====================================== */}

          <div className="profile-section">


            <h3>
              🏠 {text.contact}
            </h3>


            <div className="profile-grid">


              <div className="profile-input-group profile-full">

                <label>
                  {text.address}
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.city}
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.state}
                </label>

                <input
                  type="text"
                  value={state}
                  onChange={(e) =>
                    setState(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.pincode}
                </label>

                <input
                  type="text"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(
                      e.target.value
                    )
                  }
                />

              </div>


            </div>

          </div>


          {/* ======================================
              IDENTITY DETAILS
          ====================================== */}

          <div className="profile-section">


            <h3>
              🪪 {text.identity}
            </h3>


            <div className="profile-grid">


              <div className="profile-input-group">

                <label>
                  {text.aadhaar}
                </label>

                <input
                  type="text"
                  maxLength="12"
                  value={aadhaarNumber}
                  onChange={(e) =>
                    setAadhaarNumber(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.pan}
                </label>

                <input
                  type="text"
                  maxLength="10"
                  value={panNumber}
                  onChange={(e) =>
                    setPanNumber(
                      e.target.value.toUpperCase()
                    )
                  }
                />

              </div>


              <div className="profile-input-group">

                <label>
                  {text.voter}
                </label>

                <input
                  type="text"
                  value={voterId}
                  onChange={(e) =>
                    setVoterId(
                      e.target.value.toUpperCase()
                    )
                  }
                />

              </div>


            </div>

          </div>


          {/* MESSAGE */}

          {message && (

            <p
              className={
                messageType === "success"
                  ? "profile-success"
                  : "profile-error"
              }
            >

              {message}

            </p>

          )}


          {/* BUTTONS */}

          <div className="profile-actions">


            <button
              className="profile-back-button"
              onClick={onBack}
              type="button"
            >

              {text.back}

            </button>


            <button
              className="profile-save-button"
              onClick={handleSave}
              disabled={loading}
              type="button"
            >

              {loading

                ? text.saving

                : profile
                  ? text.update
                  : text.save

              }

            </button>


          </div>


        </div>


      </div>


    </div>

  );

}


export default Profile;