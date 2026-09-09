import "./Notifications.css";

function Notifications({ language, user, onBack }) {

const translations = {


English: {
  title: "Notifications",
  subtitle: "Stay updated about schemes, reminders and important updates.",
  back: "← Back to Dashboard",
  noNotifications: "No notifications available.",
  markAll: "Mark All as Read",

  schemeTitle: "New Government Scheme Available",
  schemeMessage:
    "A new government scheme may be available for eligible citizens. Check the details to know more.",
  schemeTime: "Today",

  documentTitle: "Document Renewal Reminder",
  documentMessage:
    "Your important document may require renewal soon. Please check the expiry date.",
  documentTime: "Yesterday",

  applicationTitle: "Application Status Update",
  applicationMessage:
    "There has been an update regarding one of your submitted applications.",
  applicationTime: "2 days ago",

  updateTitle: "Important Government Update",
  updateMessage:
    "Stay informed about the latest government services, schemes and important announcements.",
  updateTime: "3 days ago",

  internshipTitle: "New Internship Opportunities",
  internshipMessage:
    "New internship and training opportunities are available for students.",
  internshipTime: "5 days ago"
},


Hindi: {
  title: "सूचनाएं",
  subtitle: "योजनाओं, रिमाइंडर और महत्वपूर्ण अपडेट से अपडेट रहें।",
  back: "← डैशबोर्ड पर वापस जाएं",
  noNotifications: "कोई सूचना उपलब्ध नहीं है।",
  markAll: "सभी को पढ़ा हुआ चिह्नित करें",

  schemeTitle: "नई सरकारी योजना उपलब्ध",
  schemeMessage:
    "पात्र नागरिकों के लिए एक नई सरकारी योजना उपलब्ध हो सकती है। अधिक जानकारी के लिए विवरण देखें।",
  schemeTime: "आज",

  documentTitle: "दस्तावेज़ नवीनीकरण रिमाइंडर",
  documentMessage:
    "आपके महत्वपूर्ण दस्तावेज़ का नवीनीकरण जल्द आवश्यक हो सकता है। कृपया समाप्ति तिथि जांचें।",
  documentTime: "कल",

  applicationTitle: "आवेदन स्थिति अपडेट",
  applicationMessage:
    "आपके जमा किए गए आवेदन में से एक के संबंध में अपडेट आया है।",
  applicationTime: "2 दिन पहले",

  updateTitle: "महत्वपूर्ण सरकारी अपडेट",
  updateMessage:
    "नवीनतम सरकारी सेवाओं, योजनाओं और महत्वपूर्ण घोषणाओं के बारे में जानकारी प्राप्त करें।",
  updateTime: "3 दिन पहले",

  internshipTitle: "नई इंटर्नशिप के अवसर",
  internshipMessage:
    "छात्रों के लिए नई इंटर्नशिप और प्रशिक्षण के अवसर उपलब्ध हैं।",
  internshipTime: "5 दिन पहले"
},


Marathi: {
  title: "सूचना",
  subtitle: "योजना, स्मरणपत्र आणि महत्त्वाच्या अपडेट्सबद्दल माहिती मिळवा.",
  back: "← डॅशबोर्डवर परत जा",
  noNotifications: "कोणत्याही सूचना उपलब्ध नाहीत.",
  markAll: "सर्व वाचले म्हणून चिन्हांकित करा",

  schemeTitle: "नवीन सरकारी योजना उपलब्ध",
  schemeMessage:
    "पात्र नागरिकांसाठी नवीन सरकारी योजना उपलब्ध असू शकते. अधिक माहितीसाठी तपशील तपासा.",
  schemeTime: "आज",

  documentTitle: "कागदपत्र नूतनीकरण स्मरणपत्र",
  documentMessage:
    "तुमच्या महत्त्वाच्या कागदपत्राचे नूतनीकरण लवकरच आवश्यक असू शकते.",
  documentTime: "काल",

  applicationTitle: "अर्ज स्थिती अपडेट",
  applicationMessage:
    "तुमच्या सबमिट केलेल्या अर्जांपैकी एका अर्जाबद्दल नवीन अपडेट उपलब्ध आहे.",
  applicationTime: "2 दिवसांपूर्वी",

  updateTitle: "महत्त्वाचे सरकारी अपडेट",
  updateMessage:
    "नवीन सरकारी सेवा, योजना आणि महत्त्वाच्या घोषणांबद्दल माहिती मिळवा.",
  updateTime: "3 दिवसांपूर्वी",

  internshipTitle: "नवीन इंटर्नशिप संधी",
  internshipMessage:
    "विद्यार्थ्यांसाठी नवीन इंटर्नशिप आणि प्रशिक्षण संधी उपलब्ध आहेत.",
  internshipTime: "5 दिवसांपूर्वी"
},


Telugu: {
  title: "నోటిఫికేషన్లు",
  subtitle: "పథకాలు, రిమైండర్లు మరియు ముఖ్యమైన అప్‌డేట్‌ల గురించి తెలుసుకోండి.",
  back: "← డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
  noNotifications: "నోటిఫికేషన్లు అందుబాటులో లేవు.",
  markAll: "అన్నీ చదివినట్లుగా గుర్తించండి",

  schemeTitle: "కొత్త ప్రభుత్వ పథకం అందుబాటులో ఉంది",
  schemeMessage:
    "అర్హత ఉన్న పౌరులకు కొత్త ప్రభుత్వ పథకం అందుబాటులో ఉండవచ్చు. మరిన్ని వివరాల కోసం చూడండి.",
  schemeTime: "ఈరోజు",

  documentTitle: "పత్రాల పునరుద్ధరణ రిమైండర్",
  documentMessage:
    "మీ ముఖ్యమైన పత్రాన్ని త్వరలో పునరుద్ధరించాల్సి రావచ్చు. గడువు తేదీని తనిఖీ చేయండి.",
  documentTime: "నిన్న",

  applicationTitle: "దరఖాస్తు స్థితి అప్‌డేట్",
  applicationMessage:
    "మీరు సమర్పించిన దరఖాస్తుల్లో ఒకదానికి సంబంధించి కొత్త అప్‌డేట్ ఉంది.",
  applicationTime: "2 రోజుల క్రితం",

  updateTitle: "ముఖ్యమైన ప్రభుత్వ అప్‌డేట్",
  updateMessage:
    "తాజా ప్రభుత్వ సేవలు మరియు ముఖ్యమైన ప్రకటనల గురించి తెలుసుకోండి.",
  updateTime: "3 రోజుల క్రితం",

  internshipTitle: "కొత్త ఇంటర్న్‌షిప్ అవకాశాలు",
  internshipMessage:
    "విద్యార్థులకు కొత్త ఇంటర్న్‌షిప్ మరియు శిక్షణ అవకాశాలు అందుబాటులో ఉన్నాయి.",
  internshipTime: "5 రోజుల క్రితం"
}

};

const t = translations[language] || translations.English;

const notifications = [


{
  id: 1,
  icon: "🏛️",
  title: t.schemeTitle,
  message: t.schemeMessage,
  time: t.schemeTime,
  unread: true
},

{
  id: 2,
  icon: "📄",
  title: t.documentTitle,
  message: t.documentMessage,
  time: t.documentTime,
  unread: true
},

{
  id: 3,
  icon: "📊",
  title: t.applicationTitle,
  message: t.applicationMessage,
  time: t.applicationTime,
  unread: true
},

{
  id: 4,
  icon: "🔔",
  title: t.updateTitle,
  message: t.updateMessage,
  time: t.updateTime,
  unread: false
},

{
  id: 5,
  icon: "🎓",
  title: t.internshipTitle,
  message: t.internshipMessage,
  time: t.internshipTime,
  unread: false
}


];

return (


<div className="notifications-page">


  <div className="notifications-header">

    <button
      className="notifications-back-button"
      onClick={onBack}
    >
      {t.back}
    </button>


    <div className="notifications-title-section">

      <div>

        <h1>🔔 {t.title}</h1>

        <p>{t.subtitle}</p>

      </div>


      <button className="mark-all-button">

        ✓ {t.markAll}

      </button>

    </div>

  </div>


  <div className="notifications-container">


    {notifications.length === 0 ? (

      <div className="no-notifications">

        <div className="empty-icon">
          🔔
        </div>

        <p>{t.noNotifications}</p>

      </div>

    ) : (

      notifications.map((notification) => (

        <div
          className={`notification-card ${
            notification.unread ? "unread" : ""
          }`}
          key={notification.id}
        >


          <div className="notification-icon">

            {notification.icon}

          </div>


          <div className="notification-content">

            <h3>
              {notification.title}
            </h3>

            <p>
              {notification.message}
            </p>

            <span className="notification-time">

              {notification.time}

            </span>

          </div>


          {notification.unread && (

            <div className="unread-dot"></div>

          )}


        </div>

      ))

    )}


  </div>


</div>


);

}

export default Notifications;
