import { useState } from "react";

import "./FormFilling.css";


function FormFilling({
  language = "English",
  user,
  profile,
  onBack
}) {

  // ==================================================
  // STATE
  // ==================================================

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [step, setStep] =
    useState(1);

  const [processing, setProcessing] =
    useState(false);

  const [completedForm, setCompletedForm] =
    useState(null);

  const [filledFields, setFilledFields] =
    useState([]);

  const [unmatchedFields, setUnmatchedFields] =
    useState([]);

  const [error, setError] =
    useState("");


  // ==================================================
  // TRANSLATIONS
  // ==================================================

  const translations = {

    English: {

      title:
        "Government Form Assistant",

      tagline:
        "YOUR DIGITAL SAATHI 🤝",

      subtitle:
        "Upload any government form and Hamara Saathi will use your saved profile information to fill it.",

      uploadTitle:
        "Upload Government Form",

      uploadText:
        "Upload a government form as PDF, JPG or PNG.",

      chooseFile:
        "Choose Form",

      selectedFile:
        "Selected Form",

      supported:
        "PDF, JPG, JPEG and PNG supported",

      autoFill:
        "Fill Form Automatically →",

      processing:
        "Reading your form...",

      processingDescription:
        "Hamara Saathi is detecting the form fields and placing your saved profile information beside the matching fields.",

      profile:
        "Your Saved Profile",

      review:
        "Completed Form Ready",

      reviewDescription:
        "The information found in your profile has been placed in the uploaded government form.",

      filled:
        "Fields Filled",

      unmatched:
        "Fields Not Matched",

      download:
        "Download Completed Form",

      open:
        "Open Completed Form",

      another:
        "Fill Another Form",

      back:
        "← Back",

      noProfile:
        "Please complete your profile first.",

      noFile:
        "Please choose a government form.",

      success:
        "Your government form has been filled successfully.",

      important:
        "Important",

      warning:
        "Please check every automatically filled detail before submitting the form.",

      uploadStep:
        "Upload",

      fillStep:
        "Auto Fill",

      reviewStep:
        "Review"

    },


    Hindi: {

      title:
        "सरकारी फॉर्म सहायक",

      tagline:
        "आपका डिजिटल साथी 🤝",

      subtitle:
        "कोई भी सरकारी फॉर्म अपलोड करें और अपनी प्रोफाइल की जानकारी से उसे भरें।",

      uploadTitle:
        "सरकारी फॉर्म अपलोड करें",

      uploadText:
        "PDF, JPG या PNG में सरकारी फॉर्म अपलोड करें।",

      chooseFile:
        "फॉर्म चुनें",

      selectedFile:
        "चयनित फॉर्म",

      supported:
        "PDF, JPG, JPEG और PNG समर्थित हैं",

      autoFill:
        "फॉर्म अपने आप भरें →",

      processing:
        "आपका फॉर्म पढ़ा जा रहा है...",

      processingDescription:
        "हमारा साथी फॉर्म के फ़ील्ड पहचानकर आपकी प्रोफाइल की जानकारी उनके पास रख रहा है।",

      profile:
        "आपकी सेव प्रोफाइल",

      review:
        "भरा हुआ फॉर्म तैयार है",

      reviewDescription:
        "आपकी प्रोफाइल की जानकारी अपलोड किए गए सरकारी फॉर्म में रख दी गई है।",

      filled:
        "भरे गए फ़ील्ड",

      unmatched:
        "नहीं मिले फ़ील्ड",

      download:
        "भरा हुआ फॉर्म डाउनलोड करें",

      open:
        "भरा हुआ फॉर्म खोलें",

      another:
        "दूसरा फॉर्म भरें",

      back:
        "← वापस",

      noProfile:
        "कृपया पहले अपनी प्रोफाइल पूरी करें।",

      noFile:
        "कृपया सरकारी फॉर्म चुनें।",

      success:
        "आपका सरकारी फॉर्म सफलतापूर्वक भर दिया गया है।",

      important:
        "महत्वपूर्ण",

      warning:
        "फॉर्म जमा करने से पहले सभी भरी गई जानकारी ध्यान से जांचें।",

      uploadStep:
        "अपलोड",

      fillStep:
        "ऑटो फिल",

      reviewStep:
        "समीक्षा"

    },


    Marathi: {

      title:
        "सरकारी फॉर्म सहाय्यक",

      tagline:
        "तुमचा डिजिटल साथी 🤝",

      subtitle:
        "कोणताही सरकारी फॉर्म अपलोड करा आणि तुमच्या प्रोफाइलमधील माहितीने तो भरा.",

      uploadTitle:
        "सरकारी फॉर्म अपलोड करा",

      uploadText:
        "PDF, JPG किंवा PNG मध्ये सरकारी फॉर्म अपलोड करा.",

      chooseFile:
        "फॉर्म निवडा",

      selectedFile:
        "निवडलेला फॉर्म",

      supported:
        "PDF, JPG, JPEG आणि PNG समर्थित आहेत",

      autoFill:
        "फॉर्म आपोआप भरा →",

      processing:
        "तुमचा फॉर्म वाचला जात आहे...",

      processingDescription:
        "तुमच्या प्रोफाइलमधील माहिती जुळणाऱ्या फील्डजवळ ठेवली जात आहे.",

      profile:
        "तुमची सेव केलेली प्रोफाइल",

      review:
        "भरलेला फॉर्म तयार आहे",

      reviewDescription:
        "तुमच्या प्रोफाइलमधील माहिती सरकारी फॉर्ममध्ये ठेवली आहे.",

      filled:
        "भरलेले फील्ड",

      unmatched:
        "जुळले नाहीत",

      download:
        "भरलेला फॉर्म डाउनलोड करा",

      open:
        "भरलेला फॉर्म उघडा",

      another:
        "दुसरा फॉर्म भरा",

      back:
        "← मागे",

      noProfile:
        "कृपया प्रथम तुमची प्रोफाइल पूर्ण करा.",

      noFile:
        "कृपया सरकारी फॉर्म निवडा.",

      success:
        "तुमचा सरकारी फॉर्म यशस्वीरित्या भरला गेला आहे.",

      important:
        "महत्त्वाचे",

      warning:
        "फॉर्म सबमिट करण्यापूर्वी भरलेली सर्व माहिती काळजीपूर्वक तपासा.",

      uploadStep:
        "अपलोड",

      fillStep:
        "ऑटो फिल",

      reviewStep:
        "पुनरावलोकन"

    },


    Telugu: {

      title:
        "ప్రభుత్వ ఫారమ్ సహాయకుడు",

      tagline:
        "మీ డిజిటల్ సాథీ 🤝",

      subtitle:
        "ఏదైనా ప్రభుత్వ ఫారమ్‌ను అప్లోడ్ చేసి మీ ప్రొఫైల్ సమాచారంతో నింపండి.",

      uploadTitle:
        "ప్రభుత్వ ఫారమ్‌ను అప్లోడ్ చేయండి",

      uploadText:
        "PDF, JPG లేదా PNGలో ప్రభుత్వ ఫారమ్‌ను అప్లోడ్ చేయండి.",

      chooseFile:
        "ఫారమ్ ఎంచుకోండి",

      selectedFile:
        "ఎంచుకున్న ఫారమ్",

      supported:
        "PDF, JPG, JPEG మరియు PNG మద్దతు ఉంది",

      autoFill:
        "ఫారమ్‌ను ఆటోమేటిక్‌గా నింపండి →",

      processing:
        "మీ ఫారమ్ చదవబడుతోంది...",

      processingDescription:
        "మీ ప్రొఫైల్ సమాచారాన్ని సరిపోలే ఫీల్డ్‌ల పక్కన ఉంచుతున్నాము.",

      profile:
        "మీ సేవ్ చేసిన ప్రొఫైల్",

      review:
        "నింపిన ఫారం సిద్ధంగా ఉంది",

      reviewDescription:
        "మీ ప్రొఫైల్ సమాచారం ప్రభుత్వ ఫారమ్‌లో ఉంచబడింది.",

      filled:
        "నింపిన ఫీల్డ్‌లు",

      unmatched:
        "సరిపోలని ఫీల్డ్‌లు",

      download:
        "నింపిన ఫారమ్‌ను డౌన్‌లోడ్ చేయండి",

      open:
        "నింపిన ఫారమ్‌ను తెరవండి",

      another:
        "మరొక ఫారమ్ నింపండి",

      back:
        "← వెనుకకు",

      noProfile:
        "దయచేసి ముందుగా మీ ప్రొఫైల్‌ను పూర్తి చేయండి.",

      noFile:
        "దయచేసి ప్రభుత్వ ఫారమ్‌ను ఎంచుకోండి.",

      success:
        "మీ ప్రభుత్వ ఫారమ్ విజయవంతంగా నింపబడింది.",

      important:
        "ముఖ్యమైనది",

      warning:
        "ఫారమ్ సమర్పించే ముందు నింపిన వివరాలన్నింటినీ జాగ్రత్తగా తనిఖీ చేయండి.",

      uploadStep:
        "అప్లోడ్",

      fillStep:
        "ఆటో ఫిల్",

      reviewStep:
        "సమీక్ష"

    }

  };


  const text =
    translations[language] ||
    translations.English;


  // ==================================================
  // PROFILE VALUE HELPER
  // ==================================================

  const getValue = (
    keys
  ) => {

    for (
      const key
      of keys
    ) {

      if (
        profile &&
        profile[key] !== undefined &&
        profile[key] !== null &&
        String(
          profile[key]
        ).trim() !== ""
      ) {

        return profile[key];

      }


      if (
        user &&
        user[key] !== undefined &&
        user[key] !== null &&
        String(
          user[key]
        ).trim() !== ""
      ) {

        return user[key];

      }

    }


    return "";

  };


  // ==================================================
  // PROFILE INFORMATION
  // ==================================================

  const profileItems = [

    {
      label:
        text.fullName ||
        "Full Name",

      value:
        getValue([
          "full_name",
          "fullName",
          "name"
        ])
    },

    {
      label:
        text.email ||
        "Email",

      value:
        getValue([
          "email"
        ])
    },

    {
      label:
        text.mobile ||
        "Mobile Number",

      value:
        getValue([
          "phone",
          "mobile",
          "mobile_number"
        ])
    },

    {
      label:
        text.dob ||
        "Date of Birth",

      value:
        getValue([
          "date_of_birth",
          "dateOfBirth",
          "dob"
        ])
    },

    {
      label:
        text.age ||
        "Age",

      value:
        getValue([
          "age"
        ])
    },

    {
      label:
        text.gender ||
        "Gender",

      value:
        getValue([
          "gender",
          "sex"
        ])
    },

    {
      label:
        text.education ||
        "Education",

      value:
        getValue([
          "education",
          "qualification"
        ])
    },

    {
      label:
        text.occupation ||
        "Occupation",

      value:
        getValue([
          "occupation",
          "profession"
        ])
    },

    {
      label:
        text.category ||
        "Category",

      value:
        getValue([
          "category"
        ])
    },

    {
      label:
        text.address ||
        "Address",

      value:
        getValue([
          "address",
          "residential_address",
          "permanent_address"
        ])
    },

    {
      label:
        text.city ||
        "City",

      value:
        getValue([
          "city",
          "town",
          "district"
        ])
    },

    {
      label:
        text.state ||
        "State",

      value:
        getValue([
          "state"
        ])
    },

    {
      label:
        text.pincode ||
        "Pincode",

      value:
        getValue([
          "pincode",
          "pin_code",
          "postal_code"
        ])
    },

    {
      label:
        text.aadhaar ||
        "Aadhaar",

      value:
        getValue([
          "aadhaar_number",
          "aadhaar",
          "aadhar",
          "uid"
        ])
    },

    {
      label:
        text.pan ||
        "PAN",

      value:
        getValue([
          "pan_number",
          "pan"
        ])
    },

    {
      label:
        text.voter ||
        "Voter ID",

      value:
        getValue([
          "voter_id",
          "voterId"
        ])
    }

  ];


  const hasProfileData =
    profileItems.some(
      item =>
        String(
          item.value ||
          ""
        ).trim() !== ""
    );


  // ==================================================
  // SELECT FILE
  // ==================================================

  function handleFileChange(
    event
  ) {

    setError("");

    setCompletedForm(
      null
    );

    setFilledFields(
      []
    );

    setUnmatchedFields(
      []
    );


    const file =
      event.target.files?.[0];


    if (!file) {

      setSelectedFile(
        null
      );

      return;

    }


    const allowed =
      [
        "application/pdf",
        "image/jpeg",
        "image/png"
      ];


    const isValid =
      allowed.includes(
        file.type
      ) ||
      /\.(pdf|jpg|jpeg|png)$/i.test(
        file.name
      );


    if (!isValid) {

      setError(
        "Please select a PDF, JPG, JPEG or PNG government form."
      );

      setSelectedFile(
        null
      );

      return;

    }


    setSelectedFile(
      file
    );

  }


  // ==================================================
  // UPLOAD + AUTO FILL
  // ==================================================

  async function handleUpload() {

    setError("");


    if (!selectedFile) {

      setError(
        text.noFile
      );

      return;

    }


    if (!hasProfileData) {

      setError(
        text.noProfile
      );

      return;

    }


    if (
      !user?.user_id
    ) {

      setError(
        "User information is missing. Please login again."
      );

      return;

    }


    try {

      setProcessing(
        true
      );

      setStep(
        2
      );


      const formData =
        new FormData();


      formData.append(
        "form",
        selectedFile
      );


      formData.append(
        "userId",
        user.user_id
      );


      const response =
        await fetch(

          "http://localhost:5000/api/form-filling/upload",

          {

            method:
              "POST",

            body:
              formData

          }

        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        throw new Error(

          data.message ||
          "Unable to process the form."

        );

      }


      setCompletedForm(
        data
      );


      setFilledFields(
        data.filledFields ||
        []
      );


      setUnmatchedFields(
        data.unmatchedFields ||
        []
      );


      setStep(
        3
      );

    }

    catch (error) {

      console.error(
        "Form filling error:",
        error
      );


      setError(
        error.message ||
        "Unable to process the form."
      );


      setStep(
        1
      );

    }

    finally {

      setProcessing(
        false
      );

    }

  }


  // ==================================================
  // OPEN COMPLETED FORM
  // ==================================================

  function openCompletedForm() {

    if (
      !completedForm?.fileUrl
    ) {

      return;

    }


    window.open(
      completedForm.fileUrl,
      "_blank"
    );

  }


  // ==================================================
  // DOWNLOAD
  // ==================================================

  function downloadCompletedForm() {

    if (
      !completedForm?.fileUrl
    ) {

      return;

    }


    const link =
      document.createElement(
        "a"
      );


    link.href =
      completedForm.fileUrl;


    link.download =
      completedForm.fileName ||
      "completed-government-form.pdf";


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );

  }


  // ==================================================
  // RESET
  // ==================================================

  function resetForm() {

    setSelectedFile(
      null
    );

    setCompletedForm(
      null
    );

    setFilledFields(
      []
    );

    setUnmatchedFields(
      []
    );

    setError("");

    setStep(
      1
    );

  }


  // ==================================================
  // PAGE
  // ==================================================

  return (

    <div className="form-filling-page">

      <div className="form-filling-container">


        {/* =========================================
            HEADER
        ========================================= */}

        <header className="form-header">

          <button
            className="form-back-button"
            onClick={onBack}
          >
            {text.back}
          </button>


          <p className="form-tagline">
            {text.tagline}
          </p>


          <h1>
            {text.title}
          </h1>


          <p className="form-subtitle">
            {text.subtitle}
          </p>

        </header>


        {/* =========================================
            PROGRESS
        ========================================= */}

        <div className="form-progress">


          <ProgressStep
            number="1"
            label={
              text.uploadStep
            }
            active={
              step >= 1
            }
          />


          <div
            className={
              step >= 2
                ? "progress-line active"
                : "progress-line"
            }
          />


          <ProgressStep
            number="2"
            label={
              text.fillStep
            }
            active={
              step >= 2
            }
          />


          <div
            className={
              step >= 3
                ? "progress-line active"
                : "progress-line"
            }
          />


          <ProgressStep
            number="3"
            label={
              text.reviewStep
            }
            active={
              step >= 3
            }
          />

        </div>


        {/* =========================================
            ERROR
        ========================================= */}

        {error && (

          <div className="form-error">

            <span>
              ⚠️
            </span>

            <span>
              {error}
            </span>

          </div>

        )}


        {/* =========================================
            STEP 1 — UPLOAD
        ========================================= */}

        {step === 1 && (

          <section className="form-card">


            <div className="card-heading">

              <div className="card-icon">
                📄
              </div>


              <div>

                <h2>
                  {text.uploadTitle}
                </h2>

                <p>
                  {text.uploadText}
                </p>

              </div>

            </div>


            {/* UPLOAD BOX */}

            <label className="upload-box">

              <input
                type="file"
                accept="
                  .pdf,
                  .jpg,
                  .jpeg,
                  .png,
                  application/pdf,
                  image/jpeg,
                  image/png
                "
                onChange={
                  handleFileChange
                }
              />


              <div className="upload-large-icon">
                📤
              </div>


              <h3>
                {text.chooseFile}
              </h3>


              <p>
                {text.supported}
              </p>


              <span className="upload-button">
                {text.chooseFile}
              </span>

            </label>


            {/* SELECTED FILE */}

            {selectedFile && (

              <div className="selected-file">

                <span className="selected-file-icon">
                  📄
                </span>


                <div>

                  <strong>
                    {text.selectedFile}
                  </strong>

                  <p>
                    {selectedFile.name}
                  </p>

                </div>


                <span className="file-ok">
                  ✓
                </span>

              </div>

            )}


            {/* PROFILE DATA */}

            <div className="profile-section">

              <h3>
                👤 {text.profile}
              </h3>


              {!hasProfileData ? (

                <p className="profile-empty">
                  {text.noProfile}
                </p>

              ) : (

                <div className="profile-grid">

                  {profileItems
                    .filter(
                      item =>
                        String(
                          item.value ||
                          ""
                        ).trim() !== ""
                    )
                    .map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          className="profile-item"
                          key={index}
                        >

                          <span>
                            {item.label}
                          </span>

                          <strong>
                            {
                              item.value
                            }
                          </strong>

                        </div>

                      )
                    )}

                </div>

              )}

            </div>


            {/* AUTO FILL BUTTON */}

            <button
              className="primary-button"
              disabled={
                !selectedFile ||
                processing
              }
              onClick={
                handleUpload
              }
            >

              {text.autoFill}

            </button>


          </section>

        )}


        {/* =========================================
            STEP 2 — OCR / AUTO FILL
        ========================================= */}

        {step === 2 && (

          <section className="form-card processing-card">


            <div className="processing-icon">
              🤖
            </div>


            <div className="spinner"></div>


            <h2>
              {text.processing}
            </h2>


            <p>
              {text.processingDescription}
            </p>


            <div className="processing-list">

              <div>
                ✓ Reading PDF/image
              </div>

              <div>
                ✓ Detecting field labels
              </div>

              <div>
                ✓ Matching saved profile data
              </div>

              <div>
                ✓ Placing details beside fields
              </div>

              <div>
                ✓ Creating completed form
              </div>

            </div>


          </section>

        )}


        {/* =========================================
            STEP 3 — RESULT
        ========================================= */}

        {step === 3 &&
          completedForm && (

            <section className="form-card">


              <div className="success-section">

                <div className="success-icon">
                  ✓
                </div>


                <h2>
                  {text.review}
                </h2>


                <p>
                  {text.reviewDescription}
                </p>

              </div>


              {/* COMPLETED FILE */}

              <div className="result-card">

                <div className="result-icon">
                  📄
                </div>


                <div className="result-info">

                  <strong>
                    {
                      completedForm.fileName
                    }
                  </strong>


                  <p>

                    {
                      completedForm.mode ===
                      "fillable-pdf"
                        ? "Fillable PDF fields completed"
                        : "OCR field placement completed"
                    }

                  </p>

                </div>

              </div>


              {/* STATISTICS */}

              <div className="stats-grid">


                <div className="stat-box">

                  <strong>
                    {
                      filledFields.length
                    }
                  </strong>

                  <span>
                    {text.filled}
                  </span>

                </div>


                <div className="stat-box">

                  <strong>
                    {
                      unmatchedFields.length
                    }
                  </strong>

                  <span>
                    {text.unmatched}
                  </span>

                </div>


              </div>


              {/* FILLED FIELDS */}

              {filledFields.length >
                0 && (

                <div className="field-result-section">

                  <h3>
                    ✓ {text.filled}
                  </h3>


                  <div className="field-list">

                    {filledFields.map(
                      (
                        field,
                        index
                      ) => (

                        <div
                          className="field-result"
                          key={index}
                        >

                          <span>
                            {
                              field.field
                            }
                          </span>


                          <span className="filled-badge">
                            Filled
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* UNMATCHED FIELDS */}

              {unmatchedFields.length >
                0 && (

                <div className="field-result-section">

                  <h3 className="unmatched-heading">
                    ⚠ {text.unmatched}
                  </h3>


                  <div className="field-list">

                    {unmatchedFields.map(
                      (
                        field,
                        index
                      ) => (

                        <div
                          className="field-result"
                          key={index}
                        >

                          <span>
                            {field}
                          </span>


                          <span className="manual-badge">
                            Manual
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* ACTIONS */}

              <div className="action-grid">


                <button
                  className="primary-button"
                  onClick={
                    downloadCompletedForm
                  }
                >

                  ⬇ {text.download}

                </button>


                <button
                  className="secondary-button"
                  onClick={
                    openCompletedForm
                  }
                >

                  👁 {text.open}

                </button>


                <button
                  className="outline-button"
                  onClick={
                    resetForm
                  }
                >

                  ↻ {text.another}

                </button>


              </div>


              {/* WARNING */}

              <div className="warning-box">

                <strong>
                  {text.important}:
                </strong>{" "}

                {text.warning}

              </div>


            </section>

          )}

      </div>

    </div>

  );

}


// ==================================================
// PROGRESS STEP COMPONENT
// ==================================================

function ProgressStep({
  number,
  label,
  active
}) {

  return (

    <div
      className={
        active
          ? "progress-step active"
          : "progress-step"
      }
    >

      <span>
        {number}
      </span>


      <p>
        {label}
      </p>

    </div>

  );

}


export default FormFilling;