import React from 'react';
import Logo from '../../public/check-icon.png';
import Calender from '../assets/calender.jpeg';


const HomePage = () => {
  return (
    <div className="font-sans">
      <header className="flex justify-between items-center p-5 bg-gray-100 shadow-md">
        <div className="flex items-center">
          <img src={Logo} alt="Habit Tracker Logo" className="w-10 mr-3" />
          <h1 className="text-xl font-bold">Aspire</h1>
        </div>
        <nav className="flex items-center space-x-5">
          <ul className="flex space-x-5">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/my-habits" className="hover:text-blue-500">My Habits</a></li>
            <li><a href="/statistics" className="hover:text-blue-500">Statistics</a></li>
            <li><a href="/settings" className="hover:text-blue-500">Settings</a></li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign In / Sign Up</button>
        </nav>
      </header>

      <section className="flex justify-between items-center p-12 bg-teal-50">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-teal-800">Track Your Habits, Build Your Future</h2>
          <p className="text-lg mt-4 mb-6">Consistency is key. Start tracking your daily habits and turn small steps into big changes!</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded">Get Started Now</button>
        </div>
        <div className="max-w-md">
          <img src={Calender} alt="Habit Tracking Illustration" className="w-full" />
        </div>
      </section>

      <section className="flex justify-between p-12 bg-white">
        <div className="text-center w-1/4">
          <img src="/icon-habit.png" alt="Add Habit" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl text-teal-700 mb-2">Simple Habit Creation</h3>
          <p className="text-gray-600">Easily add habits with a daily, weekly, or custom frequency.</p>
        </div>
        <div className="text-center w-1/4">
          <img src="/icon-progress.png" alt="Progress Tracking" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl text-teal-700 mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Visualize your progress with charts and streaks.</p>
        </div>
        <div className="text-center w-1/4">
          <img src="/icon-reminder.png" alt="Reminders" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl text-teal-700 mb-2">Reminders & Notifications</h3>
          <p className="text-gray-600">Stay on top of your goals with timely notifications.</p>
        </div>
        <div className="text-center w-1/4">
          <img src="/icon-goals.png" alt="Personalized Goals" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl text-teal-700 mb-2">Personalized Goals</h3>
          <p className="text-gray-600">Set goals that fit your life and track them over time.</p>
        </div>
      </section>

      <section className="text-center p-12 bg-gray-100">
        <h2 className="text-2xl text-teal-700 mb-8">What Our Users Say</h2>
        <div className="italic mb-6">
          <p>"Habit Tracker has helped me stay consistent and achieve my goals like never before!"</p>
          <p>— Sarah, daily user</p>
        </div>
        <div className="italic">
          <p>"This app transformed the way I approach my daily routine."</p>
          <p>— Jake, user for 6 months</p>
        </div>
      </section>

      <footer className="text-center p-5 bg-teal-800 text-white">
        <div className="mb-4">
          <a href="/about" className="text-white hover:underline mx-2">About Us</a>
          <a href="/privacy" className="text-white hover:underline mx-2">Privacy Policy</a>
          <a href="/contact" className="text-white hover:underline mx-2">Contact Support</a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com"><img src="/icon-facebook.png" alt="Facebook" className="w-6" /></a>
          <a href="https://twitter.com"><img src="/icon-twitter.png" alt="Twitter" className="w-6" /></a>
          <a href="https://instagram.com"><img src="/icon-instagram.png" alt="Instagram" className="w-6" /></a>
        </div>
        <p>© 2024 Habit Tracker</p>
      </footer>
    </div>
  );
};

export default HomePage;

