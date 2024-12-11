import { DashboardPage } from "./pages/DashboardPage";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunitiesPage from "./pages/CommunitiesPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<CommunitiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
