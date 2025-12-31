import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import BusinessSettingsLayout from "./Components/BusinessSettings/BusinessSettingsLayout";

import YourProfile from "./Components/BusinessSettings/YourProfile";
import AccountPreferences from "./Components/BusinessSettings/AccountPreferences";
import BusinessBranding from "./Components/BusinessSettings/BusinessBranding";
import TeamLogin from "./Components/BusinessSettings/TeamLogin";
import FlipbookSettings from "./Components/BusinessSettings/FlipbookSettings";
import Watermark from "./Components/BusinessSettings/Watermark";
import Portfolio from "./Components/BusinessSettings/Portfolio";
import Wallet from "./Components/BusinessSettings/Wallet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ DASHBOARD FIRST */}
        <Route path="/" element={<Dashboard />} />

        {/* ✅ BUSINESS SETTINGS */}
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
