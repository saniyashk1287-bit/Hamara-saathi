import "./TrackApplication.css";

function TrackApplication({ language, user, onBack }) {

const translations = {

English: {
  title: "Track Application",
  subtitle: "Check the current status of your submitted applications.",
  back: "← Back to Dashboard",
  application: "Application",
  applicationId: "Application ID",
  submittedOn: "Submitted On",
  status: "Status",
  submitted: "Submitted",
  underReview: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  noApplications: "No applications found."
},

Hindi: {
  title: "आवेदन ट्रैक करें",
  subtitle: "अपने जमा किए गए आवेदनों की वर्तमान स्थिति देखें।",
  back: "← डैशबोर्ड पर वापस जाएं",
  application: "आवेदन",
  applicationId: "आवेदन आईडी",
  submittedOn: "जमा करने की तिथि",
  status: "स्थिति",
  submitted: "जमा किया गया",
  underReview: "समीक्षा के अंतर्गत",
  approved: "स्वीकृत",
  rejected: "अस्वीकृत",
  noApplications: "कोई आवेदन नहीं मिला।"
},

Marathi: {
  title: "अर्ज ट्रॅक करा",
  subtitle: "तुमच्या सबमिट केलेल्या अर्जांची सद्यस्थिती तपासा.",
  back: "← डॅशबोर्डवर परत जा",
  application: "अर्ज",
  applicationId: "अर्ज आयडी",
  submittedOn: "सबमिट केल्याची तारीख",
  status: "स्थिती",
  submitted: "सबमिट केले",
  underReview: "पुनरावलोकनाधीन",
  approved: "मंजूर",
  rejected: "नाकारले",
  noApplications: "कोणतेही अर्ज सापडले नाहीत."
},

Telugu: {
  title: "దరఖాస్తును ట్రాక్ చేయండి",
  subtitle: "మీ సమర్పించిన దరఖాస్తుల ప్రస్తుత స్థితిని చూడండి.",
  back: "← డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
  application: "దరఖాస్తు",
  applicationId: "దరఖాస్తు ఐడి",
  submittedOn: "సమర్పించిన తేదీ",
  status: "స్థితి",
  submitted: "సమర్పించబడింది",
  underReview: "సమీక్షలో ఉంది",
  approved: "ఆమోదించబడింది",
  rejected: "తిరస్కరించబడింది",
  noApplications: "ఎటువంటి దరఖాస్తులు కనుగొనబడలేదు."
}


};

const t = translations[language] || translations.English;

const applications = [


{
  id: "HS-10234",
  name: "Aadhaar Update",
  date: "30 August 2026",
  status: "Under Review"
},

{
  id: "HS-10235",
  name: "PAN Card Correction",
  date: "29 August 2026",
  status: "Submitted"
}


];

function getTranslatedStatus(status) {


if (status === "Submitted") {
  return t.submitted;
}

if (status === "Under Review") {
  return t.underReview;
}

if (status === "Approved") {
  return t.approved;
}

if (status === "Rejected") {
  return t.rejected;
}

return status;


}

function getStatusClass(status) {


if (status === "Submitted") {
  return "submitted";
}

if (status === "Under Review") {
  return "under-review";
}

if (status === "Approved") {
  return "approved";
}

if (status === "Rejected") {
  return "rejected";
}

return "";


}

return (


<div className="track-page">


  <div className="track-header">

    <button
      className="track-back-button"
      onClick={onBack}
    >
      {t.back}
    </button>


    <div className="track-title-section">

      <h1>
        📊 {t.title}
      </h1>

      <p>
        {t.subtitle}
      </p>

    </div>

  </div>


  <div className="applications-container">


    {applications.length === 0 ? (

      <div className="no-applications">

        <p>
          {t.noApplications}
        </p>

      </div>

    ) : (

      applications.map((application) => (

        <div
          className="application-card"
          key={application.id}
        >


          <div className="application-top">


            <div>

              <span className="application-label">
                {t.application}
              </span>


              <h2>
                {application.name}
              </h2>

            </div>


            <span
              className={
                `status-badge ${getStatusClass(application.status)}`
              }
            >
              {getTranslatedStatus(application.status)}
            </span>


          </div>


          <div className="application-details">


            <div className="detail-item">

              <span>
                {t.applicationId}
              </span>

              <strong>
                {application.id}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                {t.submittedOn}
              </span>

              <strong>
                {application.date}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                {t.status}
              </span>

              <strong>
                {getTranslatedStatus(application.status)}
              </strong>

            </div>


          </div>


        </div>

      ))

    )}


  </div>


</div>


);

}

export default TrackApplication;
