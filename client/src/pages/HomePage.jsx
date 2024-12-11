// import Logo from "../../public/check-icon.png";
import Calender from "../assets/calender.jpeg";
import Shrek from "../assets/shrek.png";
import Mountain from "../assets/mountain.jpeg";
import Logo from "../assets/logo.svg";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiGithub, SiLinktree } from "react-icons/si";
import { LuCalendarDays } from "react-icons/lu";
import AutoScrollCarousel from "../components/AutoScrollCarousel";
import TimelineFeatures from "../components/FeaturesTimeline";

export const HomePage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const carouselItems = [
    {
      id: 1,
      src: { Mountain },
      alt: "Slide 1",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/600x300?text=Slide+2",
      alt: "Slide 2",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/600x300?text=Slide+3",
      alt: "Slide 3",
    },
  ];
  const cardItems = [
    {
      id: 1,
      src: { Calender },
      alt: "Calender",
      title: "Simple Habit Creation",
      description:
        "Easily add habits with a daily, weekly, or custom frequency.",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/600x300?text=Progress+Tracking",
      alt: "Progress Tracking",
      title: "Progress Tracking",
      description: "Visualize your progress with charts and streaks.",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/600x300?text=Reminders",
      alt: "Reminders",
      title: "Reminders & Notifications",
      description: "Stay on top of your goals with timely notifications.",
    },
    {
      id: 4,
      src: { Shrek },
      alt: "Personalized Goals",
      title: "Personalized Goals",
      description: "Set goals that fit your life and track them over time.",
    },
  ];
  const handleSignOut = async () => {
    try {
      if (!isSignedIn) return;
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/profile");
    } else navigate("/login");
  };

  return (
    <div>
      <div
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Mountain})`,
        }}
      >
        <div className="absolute top-4 left-4">
          <img src={Logo} alt="Logo" className="h-20 w-25" />
        </div>
        <div className="absolute top-8 right-4">
          <a
            className="btn bg-brown-dark text-white hover:bg-brown-light border-none"
            onClick={handleGetStarted}
          >
            {isSignedIn ? "My Habits" : "Get Started"}
          </a>
        </div>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Transform Your <span className="text-blue-dark">Goals</span> Into
              <span className="text-brown-dark"> Habits That Last</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 max-w-7xl">
          <AutoScrollCarousel items={carouselItems} interval={3000} />
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">
              Start tracking your progress today!
            </h1>
            <p className="py-6">
              Join a community of achievers turning aspirations into reality,
              with AI powered habit tracking and personalized goal setting.
            </p>
            <button className="btn bg-brown-dark text-white hover:bg-brown-light border-none">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <TimelineFeatures />

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 max-w-7xl mx-auto p-4">
          {/* Video Container */}
          <div className="w-full lg:w-3/5 relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/eFBYfZ9FEC0?si=FFkXnIKumWAUV_vf"
                title="Habit Tracker Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/5 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              See Habit Tracker in Action!
            </h1>
            <p className="py-6 text-lg opacity-90">
              Watch how our app empowers users to transform their goals into
              lasting habits.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer footer-center bg-black text-white p-10">
        <aside>
          <img src={Logo} alt="Logo" className="h-20 w-25" />
          <p className="font-bold">
            Habit Tracker App
            <br />A CTP Class Project by Aspire
          </p>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com/JNikolo/Aspire"
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip"
              data-tip="View Repository"
            >
              <SiGithub size={24} />
            </a>
            <a
              href="https://linktr.ee/aspirectp"
              className="tooltip"
              data-tip="Visit Linktree"
              target="_blank"
            >
              <SiLinktree size={24} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};
