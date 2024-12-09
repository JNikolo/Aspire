// import Logo from "../../public/check-icon.png";
import Calender from "../assets/calender.jpeg";
import Shrek from "../assets/shrek.png";
import Mountain from "../assets/mountain.jpeg";
import Logo from "../assets/logo.svg";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiGithub, SiLinktree } from "react-icons/si";
import AutoScrollCarousel from "../components/AutoScrollCarousel";

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
      navigate("/my-habits");
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
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Transform Your <span className="text-brown-light">Goals</span>{" "}
              Into
              <span className="text-brown-dark"> Habits That Last</span>
            </h1>
            <button className="btn bg-brown-dark text-white hover:bg-brown-light border-none">
              {isSignedIn ? "My Habits" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 max-w-7xl">
          <AutoScrollCarousel items={carouselItems} interval={5000} />
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <section className="flex justify-between items-center p-12 bg-teal-50">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-teal-800">
            Track Your Habits, Build Your Future
          </h2>
          <p className="text-lg mt-4 mb-6">
            Consistency is key. Start tracking your daily habits and turn small
            steps into big changes!
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded">
            Get Started Now
          </button>
        </div>
        <div className="max-w-md">
          <img
            src={Calender}
            alt="Habit Tracking Illustration"
            className="w-full"
          />
        </div>
      </section>

      <section className="flex justify-between p-12 bg-white">
        <div className="text-center w-1/4">
          <img
            src="/icon-habit.png?url"
            alt="Add Habit"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl text-teal-700 mb-2">Simple Habit Creation</h3>
          <p className="text-gray-600">
            Easily add habits with a daily, weekly, or custom frequency.
          </p>
        </div>
        <div className="text-center w-1/4">
          <img
            src="/icon-progress.png"
            alt="Progress Tracking"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl text-teal-700 mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Visualize your progress with charts and streaks.
          </p>
        </div>
        <div className="text-center w-1/4">
          <img src={Shrek} alt="Reminders" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl text-teal-700 mb-2">
            Reminders & Notifications
          </h3>
          <p className="text-gray-600">
            Stay on top of your goals with timely notifications.
          </p>
        </div>
        <div className="text-center w-1/4">
          <img
            src="/icon-goals.png"
            alt="Personalized Goals"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl text-teal-700 mb-2">Personalized Goals</h3>
          <p className="text-gray-600">
            Set goals that fit your life and track them over time.
          </p>
        </div>
      </section>

      <section className="text-center p-12 bg-gray-100">
        <h2 className="text-2xl text-teal-700 mb-8">What Our Users Say</h2>
        <div className="italic mb-6">
          <p>
            &quot;Habit Tracker has helped me stay consistent and achieve my
            goals like never before!&quot;
          </p>
          <p>— Sarah, daily user</p>
        </div>
        <div className="italic">
          <p>
            &quot;This app transformed the way I approach my daily
            routine.&quot;
          </p>
          <p>— Jake, user for 6 months</p>
        </div>
      </section>

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
