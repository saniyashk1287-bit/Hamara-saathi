import { useState } from "react";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Language from "./pages/Language";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import FormFilling from "./pages/FormFilling";
import Documents from "./pages/Documents";
import TrackApplication from "./pages/TrackApplication";
import Notifications from "./pages/Notifications";
import { API_BASE_URL } from "./api/apiClient";

function App() {

// ==========================================
// CURRENT PAGE
// ==========================================

const [currentPage, setCurrentPage] = useState("login");

// ==========================================
// SELECTED LANGUAGE
// ==========================================

const [selectedLanguage, setSelectedLanguage] = useState("English");

// ==========================================
// CURRENT LOGGED-IN USER
// ==========================================

const [currentUser, setCurrentUser] = useState(null);

// ==========================================
// USER PROFILE
// ==========================================

const [userProfile, setUserProfile] = useState(null);

// ==========================================
// IS NEW USER
// ==========================================

const [isNewUser, setIsNewUser] = useState(false);

// ==========================================
// LOAD SAVED PROFILE
// ==========================================

async function loadUserProfile(user) {


if (!user || !user.user_id) {
  return null;
}

try {

  const response = await fetch(
    `${API_BASE_URL}/api/profile/${user.user_id}`
  );

  const data = await response.json();

  if (response.ok && data.profile) {

    setUserProfile(data.profile);

    return data.profile;

  } else {

    setUserProfile(null);

    return null;

  }

} catch (error) {

  console.error(
    "Unable to load saved profile:",
    error
  );

  setUserProfile(null);

  return null;

}

}

// ==========================================
// LOGIN
// ==========================================

async function handleLogin(user) {


setCurrentUser(user);

setIsNewUser(false);

// Load previously saved profile

await loadUserProfile(user);

// Existing user goes to language page

setCurrentPage("language");


}

// ==========================================
// OPEN REGISTER
// ==========================================

function handleOpenRegister() {


setCurrentPage("register");


}

// ==========================================
// REGISTER SUCCESS
// ==========================================

function handleRegister(user) {


setCurrentUser(user);

// New user must fill profile

setIsNewUser(true);

setUserProfile(null);

setCurrentPage("language");


}

// ==========================================
// REGISTER → LOGIN
// ==========================================

function handleBackToLogin() {


setCurrentPage("login");


}

// ==========================================
// LANGUAGE SELECTED
// ==========================================

function handleLanguageSelect(language) {


setSelectedLanguage(language);

// New registered user

if (isNewUser) {

  setCurrentPage("profile");

}

// Existing user

else {

  setCurrentPage("dashboard");

}


}

// ==========================================
// PROFILE SAVED
// ==========================================

function handleProfileComplete(profile) {


setUserProfile(profile);

setIsNewUser(false);

setCurrentPage("dashboard");


}

// ==========================================
// PROFILE → DASHBOARD
// ==========================================

function handleBackFromProfile() {


setCurrentPage("dashboard");


}

// ==========================================
// DASHBOARD → PROFILE
// ==========================================

async function openProfile() {


await loadUserProfile(currentUser);

setCurrentPage("profile");


}

// ==========================================
// DASHBOARD → FORM FILLING
// ==========================================

function openFormFilling() {


setCurrentPage("form");


}

// ==========================================
// FORM → DASHBOARD
// ==========================================

function backToDashboard() {


setCurrentPage("dashboard");


}

// ==========================================
// DASHBOARD → DOCUMENTS
// ==========================================

function openDocuments() {


setCurrentPage("documents");


}

// ==========================================
// DOCUMENTS → DASHBOARD
// ==========================================

function backFromDocuments() {


setCurrentPage("dashboard");


}

// ==========================================
// DASHBOARD → TRACK APPLICATION
// ==========================================

function openTrackApplication() {


setCurrentPage("trackApplication");


}

// ==========================================
// TRACK APPLICATION → DASHBOARD
// ==========================================

function backFromTrackApplication() {


setCurrentPage("dashboard");


}

// ==========================================
// DASHBOARD → NOTIFICATIONS
// ==========================================

function openNotifications() {


setCurrentPage("notifications");


}

// ==========================================
// NOTIFICATIONS → DASHBOARD
// ==========================================

function backFromNotifications() {


setCurrentPage("dashboard");


}

// ==========================================
// APP
// ==========================================

return (

<div className="app">

  {/* LOGIN */}

  {currentPage === "login" && (

    <Login
      onLogin={handleLogin}
      onRegister={handleOpenRegister}
    />

  )}


  {/* REGISTER */}

  {currentPage === "register" && (

    <Register
      onRegister={handleRegister}
      onLogin={handleBackToLogin}
    />

  )}


  {/* LANGUAGE */}

  {currentPage === "language" && (

    <Language
      onLanguageSelect={handleLanguageSelect}
    />

  )}


  {/* PROFILE */}

  {currentPage === "profile" && (

    <Profile
      user={currentUser}
      profile={userProfile}
      language={selectedLanguage}
      onComplete={handleProfileComplete}
      onBack={handleBackFromProfile}
    />

  )}


  {/* DASHBOARD */}

  {currentPage === "dashboard" && (

    <Dashboard
      language={selectedLanguage}
      user={currentUser}
      profile={userProfile}
      onStartFilling={openFormFilling}
      onProfile={openProfile}
      onDocuments={openDocuments}
      onTrackApplication={openTrackApplication}
      onNotifications={openNotifications}
    />

  )}


  {/* FORM FILLING */}

  {currentPage === "form" && (

    <FormFilling
      language={selectedLanguage}
      user={currentUser}
      profile={userProfile}
      onBack={backToDashboard}
    />

  )}


  {/* DOCUMENTS */}

  {currentPage === "documents" && (

    <Documents
      language={selectedLanguage}
      user={currentUser}
      onBack={backFromDocuments}
    />

  )}


  {/* TRACK APPLICATION */}

  {currentPage === "trackApplication" && (

    <TrackApplication
      language={selectedLanguage}
      user={currentUser}
      onBack={backFromTrackApplication}
    />

  )}


  {/* NOTIFICATIONS */}

  {currentPage === "notifications" && (

    <Notifications
      language={selectedLanguage}
      user={currentUser}
      onBack={backFromNotifications}
    />

  )}

</div>


);

}

export default App;
