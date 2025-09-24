import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Streaks from "./pages/Streaks";
import Rewards from "./pages/Rewards";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import HabitDetail from "./pages/HabitDetail";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: 24 }}>
        <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/habits" element={<Habits />} />
  <Route path="/habits/:id" element={<HabitDetail />} />   {/* ✅ aquí */}
  <Route path="/streaks" element={<Streaks />} />
  <Route path="/rewards" element={<Rewards />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="*" element={<NotFound />} />
  <Route path="/streaks" element={<Streaks />} />

</Routes>

      </div>
    </BrowserRouter>
  );
}
