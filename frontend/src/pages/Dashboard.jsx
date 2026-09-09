import { useState } from "react";
import "./Dashboard.css";

import logo from "../assets/hamara-saathi-logo.png";

function Dashboard({
  language = "English",
  user,
  profile,
  onStartFilling,
  onProfile,
  onDocuments,
  onTrackApplication,
  onNotifications
}) {

  // ==========================================
  // GOVERNMENT UPDATE VIEW
  // ==========================================

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ==========================================
  // AI CHAT
  // ==========================================

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // ==========================================
  // TRANSLATIONS
  // ==========================================

  const translations = {

    English: {
      dashboard: "Dashboard",
      notifications: "Notifications",
      profile: "Profile",
      tagline: "YOUR DIGITAL SAATHI 🤝",
      welcome: "Welcome to Hamara Saathi!",
      welcomeUser: "Welcome",
      help: "How can we help you today?",

      fillForm: "Fill Government Form",
      fillFormDesc:
        "Get step-by-step assistance while filling government forms.",
      startFilling: "Start Filling →",

      uploadDocuments: "Upload Documents",
      uploadDocumentsDesc:
        "Upload and manage your important documents in one place.",
      upload: "Upload Documents →",

      trackApplication: "Track Application",
      trackApplicationDesc:
        "Check the current status of your submitted applications.",
      track: "Track Application →",

      stayInformed: "STAY INFORMED",
      governmentUpdates: "Government Updates",
      governmentUpdatesDesc:
        "Stay updated about schemes, notifications and important deadlines.",

      importantNotification: "Important Notification",
      importantNotificationDesc:
        "Stay informed about new government notifications and services.",

      documentReminder: "Document Reminder",
      documentReminderDesc:
        "Get reminders about important document renewal deadlines.",

      governmentSchemes: "Government Schemes",
      governmentSchemesDesc:
        "Discover government schemes and benefits that may be useful to you.",

      jobs: "Jobs & Employment",
      jobsDesc:
        "Find government job opportunities and employment programs.",

      women: "Women Opportunities",
      womenDesc:
        "Explore employment, training and support opportunities for women.",

      elderly: "Elderly Benefits",
      elderlyDesc:
        "Find schemes, services and benefits available for elderly citizens.",

      internships: "Internships",
      internshipsDesc:
        "Discover internship opportunities and government programs for students.",

      scholarships: "Scholarships",
      scholarshipsDesc:
        "Find scholarship opportunities and educational support programs.",

      skills: "Skills & Training",
      skillsDesc:
        "Explore skill development and training opportunities.",

      viewDetails: "View Details →",

      back: "← Back",
      applyNow: "Visit Official Website →",
      noItems: "No information available.",

      digitalAssistant: "YOUR DIGITAL ASSISTANT",
      needHelp: "Need Help?",
      aiHelpDesc:
        "Ask Hamara Saathi for help with government forms and services.",
      askAssistant: "Ask Hamara Saathi →",

      footer: "Your Digital Saathi 🤝"
    },

    Hindi: {
      dashboard: "डैशबोर्ड",
      notifications: "सूचनाएं",
      profile: "प्रोफ़ाइल",
      tagline: "आपका डिजिटल साथी 🤝",
      welcome: "हमारा साथी में आपका स्वागत है!",
      welcomeUser: "स्वागत है",
      help: "आज हम आपकी कैसे मदद कर सकते हैं?",

      fillForm: "सरकारी फॉर्म भरें",
      fillFormDesc:
        "सरकारी फॉर्म भरने के लिए चरण-दर-चरण सहायता प्राप्त करें।",
      startFilling: "फॉर्म भरना शुरू करें →",

      uploadDocuments: "दस्तावेज़ अपलोड करें",
      uploadDocumentsDesc:
        "अपने महत्वपूर्ण दस्तावेज़ एक ही स्थान पर अपलोड और प्रबंधित करें।",
      upload: "दस्तावेज़ अपलोड करें →",

      trackApplication: "आवेदन ट्रैक करें",
      trackApplicationDesc:
        "अपने जमा किए गए आवेदन की स्थिति देखें।",
      track: "आवेदन ट्रैक करें →",

      stayInformed: "जानकारी प्राप्त करें",
      governmentUpdates: "सरकारी अपडेट",
      governmentUpdatesDesc:
        "योजनाओं, सूचनाओं और महत्वपूर्ण समय सीमाओं के बारे में अपडेट रहें।",

      importantNotification: "महत्वपूर्ण सूचना",
      importantNotificationDesc:
        "नई सरकारी सूचनाओं और सेवाओं के बारे में जानकारी प्राप्त करें।",

      documentReminder: "दस्तावेज़ रिमाइंडर",
      documentReminderDesc:
        "महत्वपूर्ण दस्तावेज़ नवीनीकरण की समय सीमा के बारे में रिमाइंडर प्राप्त करें।",

      governmentSchemes: "सरकारी योजनाएं",
      governmentSchemesDesc:
        "सरकारी योजनाओं और लाभों के बारे में जानकारी प्राप्त करें।",

      jobs: "नौकरियां और रोजगार",
      jobsDesc:
        "सरकारी नौकरी और रोजगार कार्यक्रम खोजें।",

      women: "महिला अवसर",
      womenDesc:
        "महिलाओं के लिए रोजगार, प्रशिक्षण और सहायता के अवसर खोजें।",

      elderly: "वृद्ध नागरिक लाभ",
      elderlyDesc:
        "वृद्ध नागरिकों के लिए योजनाएं और सेवाएं खोजें।",

      internships: "इंटर्नशिप",
      internshipsDesc:
        "छात्रों के लिए इंटर्नशिप और सरकारी कार्यक्रम खोजें।",

      scholarships: "छात्रवृत्ति",
      scholarshipsDesc:
        "शैक्षिक सहायता और छात्रवृत्ति खोजें।",

      skills: "कौशल और प्रशिक्षण",
      skillsDesc:
        "कौशल विकास और प्रशिक्षण के अवसर खोजें।",

      viewDetails: "विवरण देखें →",

      back: "← वापस",
      applyNow: "आधिकारिक वेबसाइट देखें →",
      noItems: "कोई जानकारी उपलब्ध नहीं है।",

      digitalAssistant: "आपका डिजिटल सहायक",
      needHelp: "मदद चाहिए?",
      aiHelpDesc:
        "सरकारी फॉर्म और सेवाओं के लिए हमारा साथी से सहायता प्राप्त करें।",
      askAssistant: "हमारा साथी से पूछें →",

      footer: "आपका डिजिटल साथी 🤝"
    },

    Marathi: {
      dashboard: "डॅशबोर्ड",
      notifications: "सूचना",
      profile: "प्रोफाइल",
      tagline: "तुमचा डिजिटल साथी 🤝",
      welcome: "हमारा साथीमध्ये तुमचे स्वागत आहे!",
      welcomeUser: "स्वागत आहे",
      help: "आज आम्ही तुमची कशी मदत करू शकतो?",

      fillForm: "सरकारी फॉर्म भरा",
      fillFormDesc:
        "सरकारी फॉर्म भरताना टप्प्याटप्प्याने मदत मिळवा.",
      startFilling: "फॉर्म भरण्यास सुरुवात करा →",

      uploadDocuments: "कागदपत्रे अपलोड करा",
      uploadDocumentsDesc:
        "तुमची महत्त्वाची कागदपत्रे एका ठिकाणी अपलोड करा.",
      upload: "कागदपत्रे अपलोड करा →",

      trackApplication: "अर्ज ट्रॅक करा",
      trackApplicationDesc:
        "तुमच्या अर्जाची स्थिती तपासा.",
      track: "अर्ज ट्रॅक करा →",

      stayInformed: "माहिती मिळवा",
      governmentUpdates: "सरकारी अपडेट्स",
      governmentUpdatesDesc:
        "सरकारी योजना आणि महत्त्वाच्या सूचना जाणून घ्या.",

      importantNotification: "महत्त्वाची सूचना",
      importantNotificationDesc:
        "नवीन सरकारी सूचनांची माहिती मिळवा.",

      documentReminder: "कागदपत्र स्मरणपत्र",
      documentReminderDesc:
        "कागदपत्रांच्या नूतनीकरणाच्या तारखांची माहिती मिळवा.",

      governmentSchemes: "सरकारी योजना",
      governmentSchemesDesc:
        "तुमच्यासाठी उपयुक्त सरकारी योजना शोधा.",

      jobs: "नोकऱ्या आणि रोजगार",
      jobsDesc:
        "सरकारी नोकरीच्या संधी शोधा.",

      women: "महिलांसाठी संधी",
      womenDesc:
        "महिलांसाठी रोजगार आणि प्रशिक्षण संधी शोधा.",

      elderly: "ज्येष्ठ नागरिक लाभ",
      elderlyDesc:
        "ज्येष्ठ नागरिकांसाठी योजना शोधा.",

      internships: "इंटर्नशिप",
      internshipsDesc:
        "विद्यार्थ्यांसाठी इंटर्नशिप संधी शोधा.",

      scholarships: "शिष्यवृत्ती",
      scholarshipsDesc:
        "शैक्षणिक मदत आणि शिष्यवृत्ती शोधा.",

      skills: "कौशल्य आणि प्रशिक्षण",
      skillsDesc:
        "कौशल्य विकास आणि प्रशिक्षण संधी शोधा.",

      viewDetails: "तपशील पहा →",

      back: "← मागे",
      applyNow: "अधिकृत वेबसाइट पहा →",
      noItems: "माहिती उपलब्ध नाही.",

      digitalAssistant: "तुमचा डिजिटल सहाय्यक",
      needHelp: "मदत हवी आहे?",
      aiHelpDesc:
        "सरकारी फॉर्मसाठी हमारा साथीची मदत घ्या.",
      askAssistant: "हमारा साथीला विचारा →",

      footer: "तुमचा डिजिटल साथी 🤝"
    },

    Telugu: {
      dashboard: "డాష్‌బోర్డ్",
      notifications: "నోటిఫికేషన్లు",
      profile: "ప్రొఫైల్",
      tagline: "మీ డిజిటల్ సాథీ 🤝",
      welcome: "హమారా సాథీకి స్వాగతం!",
      welcomeUser: "స్వాగతం",
      help: "ఈరోజు మేము మీకు ఎలా సహాయం చేయగలం?",

      fillForm: "ప్రభుత్వ ఫారమ్ పూరించండి",
      fillFormDesc:
        "ప్రభుత్వ ఫారమ్ పూరించడానికి దశలవారీ సహాయం పొందండి.",
      startFilling: "ఫారమ్ ప్రారంభించండి →",

      uploadDocuments: "పత్రాలను అప్‌లోడ్ చేయండి",
      uploadDocumentsDesc:
        "మీ ముఖ్యమైన పత్రాలను ఒకే చోట అప్‌లోడ్ చేయండి.",
      upload: "పత్రాలను అప్‌లోడ్ చేయండి →",

      trackApplication: "దరఖాస్తును ట్రాక్ చేయండి",
      trackApplicationDesc:
        "మీ సమర్పించిన దరఖాస్తు స్థితిని చూడండి.",
      track: "దరఖాస్తును ట్రాక్ చేయండి →",

      stayInformed: "సమాచారం పొందండి",
      governmentUpdates: "ప్రభుత్వ అప్‌డేట్‌లు",
      governmentUpdatesDesc:
        "ప్రభుత్వ పథకాలు మరియు ముఖ్యమైన సమాచారం గురించి తెలుసుకోండి.",

      importantNotification: "ముఖ్యమైన నోటిఫికేషన్",
      importantNotificationDesc:
        "కొత్త ప్రభుత్వ నోటిఫికేషన్ల గురించి తెలుసుకోండి.",

      documentReminder: "పత్రాల రిమైండర్",
      documentReminderDesc:
        "ముఖ్యమైన పత్రాల గడువుల గురించి రిమైండర్ పొందండి.",

      governmentSchemes: "ప్రభుత్వ పథకాలు",
      governmentSchemesDesc:
        "మీకు ఉపయోగకరమైన ప్రభుత్వ పథకాలను కనుగొనండి.",

      jobs: "ఉద్యోగాలు",
      jobsDesc:
        "ప్రభుత్వ ఉద్యోగ అవకాశాలను కనుగొనండి.",

      women: "మహిళలకు అవకాశాలు",
      womenDesc:
        "మహిళలకు ఉపాధి మరియు శిక్షణ అవకాశాలను కనుగొనండి.",

      elderly: "వృద్ధుల ప్రయోజనాలు",
      elderlyDesc:
        "వృద్ధులకు అందుబాటులో ఉన్న పథకాలను కనుగొనండి.",

      internships: "ఇంటర్న్‌షిప్‌లు",
      internshipsDesc:
        "విద్యార్థులకు ఇంటర్న్‌షిప్ అవకాశాలను కనుగొనండి.",

      scholarships: "స్కాలర్‌షిప్‌లు",
      scholarshipsDesc:
        "విద్యా సహాయం మరియు స్కాలర్‌షిప్‌లను కనుగొనండి.",

      skills: "నైపుణ్యాలు మరియు శిక్షణ",
      skillsDesc:
        "నైపుణ్య అభివృద్ధి అవకాశాలను కనుగొనండి.",

      viewDetails: "వివరాలు చూడండి →",

      back: "← వెనుకకు",
      applyNow: "అధికారిక వెబ్‌సైట్ చూడండి →",
      noItems: "సమాచారం అందుబాటులో లేదు.",

      digitalAssistant: "మీ డిజిటల్ సహాయకుడు",
      needHelp: "సహాయం కావాలా?",
      aiHelpDesc:
        "ప్రభుత్వ ఫారమ్‌ల కోసం హమారా సాథీ సహాయం పొందండి.",
      askAssistant: "హమారా సాథీని అడగండి →",

      footer: "మీ డిజిటల్ సాథీ 🤝"
    }
  };

  const text = translations[language] || translations.English;

  // ==========================================
  // USER NAME
  // ==========================================

  const userName =
    profile?.fullName ||
    profile?.full_name ||
    user?.full_name ||
    "User";

  // ==========================================
  // AI CHAT WELCOME MESSAGE
  // ==========================================

  const getWelcomeMessage = () => {

    if (language === "Hindi") {
      return "नमस्ते! 👋 मैं हमारा साथी हूँ। सरकारी फॉर्म, दस्तावेज़ और सरकारी सेवाओं से जुड़ी जानकारी में मैं आपकी मदद कर सकता हूँ।";
    }

    if (language === "Marathi") {
      return "नमस्कार! 👋 मी हमारा साथी आहे. सरकारी फॉर्म, कागदपत्रे आणि सरकारी सेवांबद्दल माहिती मिळवण्यासाठी मी तुमची मदत करू शकतो.";
    }

    if (language === "Telugu") {
      return "నమస్కారం! 👋 నేను హమారా సాథీ. ప్రభుత్వ ఫారమ్‌లు, పత్రాలు మరియు ప్రభుత్వ సేవల గురించి మీకు సహాయం చేయగలను.";
    }

    return "Hello! 👋 I am Hamara Saathi. I can help you with government forms, documents and government services.";
  };

  // ==========================================
  // OPEN AI CHAT
  // ==========================================

  const openChat = () => {

    setIsChatOpen(true);

    if (chatMessages.length === 0) {
      setChatMessages([
        {
          role: "assistant",
          content: getWelcomeMessage()
        }
      ]);
    }
  };

  // ==========================================
  // CLOSE AI CHAT
  // ==========================================

  const closeChat = () => {
    setIsChatOpen(false);
  };

  // ==========================================
  // SEND AI MESSAGE
  // ==========================================

  const sendMessage = async () => {

    const message = chatInput.trim();

    if (!message || isChatLoading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: message
    };

    const updatedMessages = [
      ...chatMessages,
      userMessage
    ];

    setChatMessages(updatedMessages);
    setChatInput("");
    setIsChatLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            language,
            messages: updatedMessages
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to get AI response."
        );
      }

      setChatMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I could not generate a response."
        }
      ]);

    } catch (error) {

      console.error(
        "AI chat error:",
        error
      );

      setChatMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I am unable to respond right now. Please make sure the Hamara Saathi backend is running."
        }
      ]);

    } finally {

      setIsChatLoading(false);

    }
  };

  // ==========================================
  // ENTER KEY FOR CHAT
  // ==========================================

  const handleChatKeyDown = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // ==========================================
  // GOVERNMENT UPDATE DATA
  // ==========================================

  const governmentData = {

    importantNotification: [
      {
        title: "National Scholarship Portal – AY 2026–27",
        description:
          "The National Scholarship Portal is open for the 2026–27 academic year. Several scholarship applications are currently available.",
        category: "Scholarship Notification",
        deadline: "Check individual scholarship deadline",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "UPSC Combined Geo-Scientist Examination 2027",
        description:
          "UPSC has released the notification for the Combined Geo-Scientist Examination 2027.",
        category: "UPSC Examination",
        deadline: "22 September 2026",
        link: "https://upsc.gov.in/"
      },
      {
        title: "UPSC Special Advertisement No. 52/2026",
        description:
          "UPSC has released a special recruitment advertisement for eligible candidates.",
        category: "Recruitment",
        deadline: "11 September 2026",
        link: "https://upsc.gov.in/"
      }
    ],

    documentReminder: [
      {
        title: "Aadhaar",
        description:
          "Check your Aadhaar details and update information whenever required.",
        category: "Identity Document",
        deadline: "Check Aadhaar requirements",
        link: "https://uidai.gov.in/"
      },
      {
        title: "PAN Card",
        description:
          "Keep your PAN information updated and verify your details when required.",
        category: "Financial Identity",
        deadline: "As applicable",
        link: "https://www.incometax.gov.in/"
      },
      {
        title: "Passport",
        description:
          "Check your passport validity and begin renewal before expiry.",
        category: "Travel Document",
        deadline: "Before passport expiry",
        link: "https://www.passportindia.gov.in/"
      }
    ],

    governmentSchemes: [
      {
        title: "myScheme",
        description:
          "Find Central and State government schemes based on eligibility, benefits and requirements.",
        category: "Government Scheme Finder",
        deadline: "No fixed deadline",
        link: "https://www.myscheme.gov.in/"
      },
      {
        title: "PM-KISAN",
        description:
          "Government support scheme for eligible landholding farmer families.",
        category: "Agriculture",
        deadline: "Check current requirements",
        link: "https://pmkisan.gov.in/"
      },
      {
        title: "Ayushman Bharat PM-JAY",
        description:
          "Government health coverage scheme for eligible beneficiaries.",
        category: "Healthcare",
        deadline: "Check eligibility",
        link: "https://beneficiary.nha.gov.in/"
      }
    ],

    jobs: [
      {
        title: "National Career Service – Government Jobs",
        description:
          "Search government job vacancies available through the National Career Service.",
        category: "Government Employment",
        deadline: "Varies by vacancy",
        link: "https://ncs.gov.in/job-listing?isGovernmentJob=true"
      },
      {
        title: "UPSC Recruitment",
        description:
          "Find current UPSC examinations, recruitment advertisements and vacancies.",
        category: "Central Government Recruitment",
        deadline: "Varies by notification",
        link: "https://upsc.gov.in/"
      },
      {
        title: "SSC Recruitment",
        description:
          "Find current Staff Selection Commission examinations and recruitment opportunities.",
        category: "Central Government Recruitment",
        deadline: "Varies by examination",
        link: "https://ssc.gov.in/"
      },
      {
        title: "Maharashtra Employment Portal",
        description:
          "Search employment and job opportunities available through Maharashtra's employment services.",
        category: "Maharashtra Employment",
        deadline: "Varies by vacancy",
        link: "https://rojgar.mahaswayam.gov.in/"
      }
    ],

    women: [
      {
        title: "Mission Shakti",
        description:
          "Government initiative focused on women's safety, security and empowerment.",
        category: "Women Safety & Empowerment",
        deadline: "Ongoing",
        link: "https://missionshakti.wcd.gov.in/"
      },
      {
        title: "Pradhan Mantri Matru Vandana Yojana",
        description:
          "Maternity benefit programme providing support to eligible women.",
        category: "Women & Maternity Support",
        deadline: "Check eligibility",
        link: "https://pmmvy.wcd.gov.in/"
      },
      {
        title: "Women Helpline – 181",
        description:
          "Women can access support and assistance through the Women Helpline.",
        category: "Women Support",
        deadline: "Available as per service",
        link: "https://missionshakti.wcd.gov.in/"
      }
    ],

    elderly: [
      {
        title: "Atal Vayo Abhyuday Yojana",
        description:
          "Government programme supporting financial security, healthcare, nutrition, shelter, welfare and protection of senior citizens.",
        category: "Senior Citizen Welfare",
        deadline: "Ongoing",
        link: "https://socialjustice.gov.in/schemes/43"
      },
      {
        title: "National Social Assistance Programme",
        description:
          "Social assistance programme that includes support for eligible elderly persons and other vulnerable groups.",
        category: "Social Assistance",
        deadline: "Check eligibility",
        link: "https://nsap.nic.in/"
      },
      {
        title: "Ayushman Bharat Health Coverage",
        description:
          "Eligible senior citizens can check government health coverage and related benefits.",
        category: "Healthcare",
        deadline: "Check eligibility",
        link: "https://beneficiary.nha.gov.in/"
      },
      {
        title: "Elderline – 14567",
        description:
          "National helpline providing support and information for senior citizens.",
        category: "Senior Citizen Support",
        deadline: "Helpline service",
        link: "https://socialjustice.gov.in/"
      }
    ],

    internships: [
      {
        title: "Prime Minister's Internship Scheme",
        description:
          "A government internship initiative providing internship opportunities for eligible young people.",
        category: "Government Internship",
        deadline: "Check current application cycle",
        link: "https://pminternship.mca.gov.in/"
      },
      {
        title: "MoSPI Internship Programme",
        description:
          "Internship opportunities offered through the Ministry of Statistics and Programme Implementation.",
        category: "Government Internship",
        deadline: "Check current opening",
        link: "https://www.internship.mospi.gov.in/"
      }
    ],

    scholarships: [
      {
        title:
          "PM-USP Central Sector Scheme of Scholarship for College & University Students",
        description:
          "Scholarship support for eligible college and university students under the National Scholarship Portal.",
        category: "Higher Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "AICTE Pragati Scholarship Scheme for Girl Students",
        description:
          "Scholarship opportunity for eligible girl students pursuing technical education.",
        category: "Technical Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "AICTE Swanath Scholarship Scheme",
        description:
          "Scholarship support for eligible students pursuing technical education.",
        category: "Technical Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "PM YASASVI Top Class Education",
        description:
          "Scholarship support for eligible OBC, EBC and DNT students in higher education.",
        category: "Higher Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "Top Class Education for SC Students",
        description:
          "Educational financial support for eligible SC students pursuing higher education.",
        category: "Higher Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "National Fellowship & Scholarship for Higher Education of ST Students",
        description:
          "Higher education fellowship and scholarship support for eligible ST students.",
        category: "Higher Education",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "Scholarship for Students with Disabilities",
        description:
          "Scholarship opportunities available for eligible students with disabilities.",
        category: "Education Support",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "PM Scholarship Scheme – CAPF & Assam Rifles",
        description:
          "Scholarship support for eligible wards of Central Armed Police Forces and Assam Rifles personnel.",
        category: "Education Support",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      },
      {
        title: "PM Scholarship Scheme – Ministry of Railways",
        description:
          "Scholarship support for eligible wards of railway personnel.",
        category: "Education Support",
        deadline: "31 October 2026",
        link: "https://scholarships.gov.in/"
      }
    ],

    skills: [
      {
        title: "Skill India",
        description:
          "Explore government skill development and training opportunities.",
        category: "Skill Development",
        deadline: "Check current programmes",
        link: "https://www.skillindia.gov.in/"
      },
      {
        title: "National Career Service",
        description:
          "Access career guidance, employment services and related opportunities.",
        category: "Career Development",
        deadline: "Ongoing",
        link: "https://ncs.gov.in/"
      },
      {
        title: "myScheme – Skills & Training",
        description:
          "Find government skill development and training schemes based on eligibility.",
        category: "Training",
        deadline: "Varies by scheme",
        link: "https://www.myscheme.gov.in/"
      }
    ]
  };

  // ==========================================
  // CATEGORY INFORMATION
  // ==========================================

  const categories = [
    {
      key: "governmentSchemes",
      icon: "🏛️",
      title: text.governmentSchemes,
      description: text.governmentSchemesDesc
    },
    {
      key: "jobs",
      icon: "💼",
      title: text.jobs,
      description: text.jobsDesc
    },
    {
      key: "women",
      icon: "👩",
      title: text.women,
      description: text.womenDesc
    },
    {
      key: "elderly",
      icon: "👴",
      title: text.elderly,
      description: text.elderlyDesc
    },
    {
      key: "internships",
      icon: "🎓",
      title: text.internships,
      description: text.internshipsDesc
    },
    {
      key: "scholarships",
      icon: "📚",
      title: text.scholarships,
      description: text.scholarshipsDesc
    },
    {
      key: "skills",
      icon: "🛠️",
      title: text.skills,
      description: text.skillsDesc
    }
  ];

  // ==========================================
  // OPEN CATEGORY
  // ==========================================

  function openCategory(category) {
    setSelectedCategory(category);
    setSelectedItem(null);
  }

  // ==========================================
  // BACK TO CATEGORIES
  // ==========================================

  function backToCategories() {
    setSelectedCategory(null);
    setSelectedItem(null);
  }

  // ==========================================
  // OPEN ITEM
  // ==========================================

  function openItem(item) {
    setSelectedItem(item);
  }

  // ==========================================
  // OPEN OFFICIAL WEBSITE
  // ==========================================

  function openOfficialWebsite(link) {
    window.open(link, "_blank", "noopener,noreferrer");
  }

  // ==========================================
  // RENDER INDIVIDUAL ITEM
  // ==========================================

  if (selectedItem) {

    return (
      <div className="dashboard">

        <nav className="dashboard-navbar">

          <div className="dashboard-brand">

            <div className="dashboard-logo-box">

              <img
                src={logo}
                alt="Hamara Saathi Logo"
                className="dashboard-logo"
              />

            </div>

            <div className="dashboard-brand-text">

              <h2>Hamara Saathi</h2>
              <span>YOUR DIGITAL SAATHI</span>

            </div>

          </div>

          <div className="dashboard-nav">

            <span
              className="nav-item active"
              onClick={backToCategories}
              style={{ cursor: "pointer" }}
            >
              {text.dashboard}
            </span>

            <span
              className="nav-item"
              onClick={onNotifications}
              style={{ cursor: "pointer" }}
            >
              🔔 {text.notifications}
            </span>

            <span
              className="nav-item"
              onClick={onProfile}
              style={{ cursor: "pointer" }}
            >
              👤 {text.profile}
            </span>

          </div>

        </nav>

        <section className="government-detail-page">

          <button
            className="government-back-button"
            onClick={() => setSelectedItem(null)}
          >
            {text.back}
          </button>

          <div className="government-detail-card">

            <div className="government-detail-icon">
              📌
            </div>

            <h1>{selectedItem.title}</h1>

            <span className="government-detail-category">
              {selectedItem.category}
            </span>

            <p className="government-detail-description">
              {selectedItem.description}
            </p>

            <div className="government-detail-deadline">

              <strong>Deadline / Status:</strong>

              <span>
                {selectedItem.deadline}
              </span>

            </div>

            <button
              className="government-official-button"
              onClick={() =>
                openOfficialWebsite(selectedItem.link)
              }
            >
              {text.applyNow}
            </button>

          </div>

        </section>

        <footer className="dashboard-footer">

          <strong>Hamara Saathi</strong>

          <span>{text.footer}</span>

        </footer>

      </div>
    );
  }

  // ==========================================
  // RENDER CATEGORY LIST
  // ==========================================

  if (selectedCategory) {

    const items =
      governmentData[selectedCategory.key] || [];

    return (
      <div className="dashboard">

        <nav className="dashboard-navbar">

          <div className="dashboard-brand">

            <div className="dashboard-logo-box">

              <img
                src={logo}
                alt="Hamara Saathi Logo"
                className="dashboard-logo"
              />

            </div>

            <div className="dashboard-brand-text">

              <h2>Hamara Saathi</h2>

              <span>YOUR DIGITAL SAATHI</span>

            </div>

          </div>

          <div className="dashboard-nav">

            <span
              className="nav-item active"
              onClick={backToCategories}
              style={{ cursor: "pointer" }}
            >
              {text.dashboard}
            </span>

            <span
              className="nav-item"
              onClick={onNotifications}
              style={{ cursor: "pointer" }}
            >
              🔔 {text.notifications}
            </span>

            <span
              className="nav-item"
              onClick={onProfile}
              style={{ cursor: "pointer" }}
            >
              👤 {text.profile}
            </span>

          </div>

        </nav>

        <section className="government-list-page">

          <button
            className="government-back-button"
            onClick={backToCategories}
          >
            {text.back}
          </button>

          <div className="updates-heading">

            <p>{text.stayInformed}</p>

            <h2>
              {selectedCategory.icon}{" "}
              {selectedCategory.title}
            </h2>

            <span>
              {selectedCategory.description}
            </span>

          </div>

          <div className="government-items-grid">

            {items.length > 0 ? (

              items.map((item, index) => (

                <div
                  className="government-item-card"
                  key={index}
                >

                  <div className="government-item-icon">
                    {selectedCategory.icon}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <span className="item-deadline">
                    {item.deadline}
                  </span>

                  <button
                    onClick={() => openItem(item)}
                  >
                    {text.viewDetails}
                  </button>

                </div>

              ))

            ) : (

              <p>{text.noItems}</p>

            )}

          </div>

        </section>

        <footer className="dashboard-footer">

          <strong>Hamara Saathi</strong>

          <span>{text.footer}</span>

        </footer>

      </div>
    );
  }

  // ==========================================
  // MAIN DASHBOARD
  // ==========================================

  return (

    <div className="dashboard">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="dashboard-navbar">

        <div className="dashboard-brand">

          <div className="dashboard-logo-box">

            <img
              src={logo}
              alt="Hamara Saathi Logo"
              className="dashboard-logo"
            />

          </div>

          <div className="dashboard-brand-text">

            <h2>Hamara Saathi</h2>

            <span>YOUR DIGITAL SAATHI</span>

          </div>

        </div>

        <div className="dashboard-nav">

          <span className="nav-item active">
            {text.dashboard}
          </span>

          {/* NOTIFICATIONS REMAIN IN HEADER */}

          <span
            className="nav-item"
            onClick={onNotifications}
            style={{ cursor: "pointer" }}
          >
            🔔 {text.notifications}
          </span>

          <span
            className="nav-item"
            onClick={onProfile}
            style={{ cursor: "pointer" }}
          >
            👤 {text.profile}
          </span>

        </div>

      </nav>


      {/* ======================================
          WELCOME
      ====================================== */}

      <section className="welcome">

        <div>

          <p className="tagline">
            {text.tagline}
          </p>

          <h1>
            {text.welcomeUser}, {userName}! 👋
          </h1>

          <p>
            {text.help}
          </p>

        </div>

      </section>


      {/* ======================================
          GOVERNMENT UPDATES
      ====================================== */}

      <section className="government-updates">

        <div className="updates-heading">

          <p>
            {text.stayInformed}
          </p>

          <h2>
            {text.governmentUpdates}
          </h2>

          <span>
            {text.governmentUpdatesDesc}
          </span>

        </div>


        <div className="updates-grid">

          {categories.map((category) => (

            <div
              className="update-card"
              key={category.key}
            >

              <div className="update-icon">
                {category.icon}
              </div>

              <h3>
                {category.title}
              </h3>

              <p>
                {category.description}
              </p>

              <button
                onClick={() => openCategory(category)}
              >
                {text.viewDetails}
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ======================================
          MAIN SERVICES
          NOTIFICATIONS CARD REMOVED
      ====================================== */}

      <section className="dashboard-services">

        <div className="service-card">

          <div className="service-icon">
            📝
          </div>

          <h2>{text.fillForm}</h2>

          <p>
            {text.fillFormDesc}
          </p>

          <button onClick={onStartFilling}>
            {text.startFilling}
          </button>

        </div>


        <div className="service-card">

          <div className="service-icon">
            📄
          </div>

          <h2>{text.uploadDocuments}</h2>

          <p>
            {text.uploadDocumentsDesc}
          </p>

          <button onClick={onDocuments}>
            {text.upload}
          </button>

        </div>


        <div className="service-card">

          <div className="service-icon">
            📊
          </div>

          <h2>{text.trackApplication}</h2>

          <p>
            {text.trackApplicationDesc}
          </p>

          <button onClick={onTrackApplication}>
            {text.track}
          </button>

        </div>

      </section>


      {/* ======================================
          AI HELP
      ====================================== */}

      <section className="ai-help-section">

        <div className="ai-help-icon">
          🤖
        </div>

        <div>

          <p>
            {text.digitalAssistant}
          </p>

          <h2>
            {text.needHelp}
          </h2>

          <span>
            {text.aiHelpDesc}
          </span>

        </div>

        {/* AI CHAT BUTTON */}

        <button onClick={openChat}>
          {text.askAssistant}
        </button>

      </section>


      {/* ======================================
          AI CHAT WINDOW
      ====================================== */}

      {isChatOpen && (

        <div className="ai-chat-overlay">

          <div className="ai-chat-window">

            {/* CHAT HEADER */}

            <div className="ai-chat-header">

              <div>

                <div className="ai-chat-title">
                  🤖 Hamara Saathi
                </div>

                <div className="ai-chat-subtitle">
                  {text.digitalAssistant}
                </div>

              </div>

              <button
                className="ai-chat-close"
                onClick={closeChat}
              >
                ✕
              </button>

            </div>


            {/* CHAT MESSAGES */}

            <div className="ai-chat-messages">

              {chatMessages.map(
                (message, index) => (

                  <div
                    key={index}
                    className={`ai-chat-message ${
                      message.role === "user"
                        ? "user-message"
                        : "assistant-message"
                    }`}
                  >

                    {message.content}

                  </div>

                )
              )}

              {isChatLoading && (

                <div className="ai-chat-message assistant-message">
                  Typing...
                </div>

              )}

            </div>


            {/* CHAT INPUT */}

            <div className="ai-chat-input-area">

              <input
                type="text"
                value={chatInput}
                onChange={(event) =>
                  setChatInput(event.target.value)
                }
                onKeyDown={handleChatKeyDown}
                placeholder={
                  language === "Hindi"
                    ? "अपना सवाल लिखें..."
                    : language === "Marathi"
                    ? "तुमचा प्रश्न लिहा..."
                    : language === "Telugu"
                    ? "మీ ప్రశ్నను టైప్ చేయండి..."
                    : "Type your question..."
                }
                disabled={isChatLoading}
              />

              <button
                onClick={sendMessage}
                disabled={
                  isChatLoading ||
                  !chatInput.trim()
                }
              >
                ➤
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="dashboard-footer">

        <strong>
          Hamara Saathi
        </strong>

        <span>
          {text.footer}
        </span>

      </footer>

    </div>

  );
}

export default Dashboard;