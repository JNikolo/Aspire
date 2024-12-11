import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { ChatbotBubble } from "./components/ChatbotBubble";
import { useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunitiesPage from "./pages/CommunitiesPage";

const routesWithNavbar = [
  "/profile",
  "/dashboard",
  "/survey/new",
  "/survey/:habitId/edit",
];
function App() {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  // Check if the current route requires the Navbar
  const showNavbar = routesWithNavbar.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}
      <Outlet />
      {isSignedIn && <ChatbotBubble />}
      <Routes>
        <Route path="/" element={<CommunitiesPage />} />
      </Routes>
    </>
  );
}

export default App;
