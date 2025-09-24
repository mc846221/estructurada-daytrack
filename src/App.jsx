import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import HabitDetail from "./pages/HabitDetail";
import Streaks from "./pages/Streaks";
import Rewards from "./pages/Rewards";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/habits"
          element={
            <Protected>
              <Habits />
            </Protected>
          }
        />
        <Route
          path="/habits/:id"
          element={
            <Protected>
              <HabitDetail />
            </Protected>
          }
        />
        <Route
          path="/streaks"
          element={
            <Protected>
              <Streaks />
            </Protected>
          }
        />
        <Route
          path="/rewards"
          element={
            <Protected>
              <Rewards />
            </Protected>
          }
        />
        <Route
          path="/reports"
          element={
            <Protected>
              <Reports />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
