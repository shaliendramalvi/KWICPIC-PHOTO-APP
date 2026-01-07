import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import GroupDetails from "./Assets/GroupDetails";

import BusinessSettingsLayout from "./Components/BusinessSettings/BusinessSettingsLayout";
import YourProfile from "./Components/BusinessSettings/YourProfile";
import AccountPreferences from "./Components/BusinessSettings/AccountPreferences";
import BusinessBranding from "./Components/BusinessSettings/BusinessBranding";
import TeamLogin from "./Components/BusinessSettings/TeamLogin";
import FlipbookSettings from "./Components/BusinessSettings/FlipbookSettings";
import Watermark from "./Components/BusinessSettings/Watermark";
import Portfolio from "./Components/BusinessSettings/Portfolio";
import Wallet from "./Components/BusinessSettings/Wallet";

import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
      {/* HEADER HAR PAGE PE DIKHEGA (LOGIN PE BHI) */}
      <Header />

      <Routes>
        {/* 🔴 DEFAULT → LOGIN */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🏠 DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 📸 GROUP */}
        <Route path="/group/:id" element={<GroupDetails />} />

        {/* ⚙️ BUSINESS SETTINGS */}
        <Route path="/business-settings" element={<BusinessSettingsLayout />}>
          <Route index element={<YourProfile />} />
          <Route path="profile" element={<YourProfile />} />
          <Route path="preferences" element={<AccountPreferences />} />
          <Route path="branding" element={<BusinessBranding />} />
          <Route path="team-login" element={<TeamLogin />} />
          <Route path="flipbook" element={<FlipbookSettings />} />
          <Route path="watermark" element={<Watermark />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
