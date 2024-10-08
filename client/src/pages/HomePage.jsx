import React from 'react';
import './HomePage.css';
import Logo from '../../public/check-icon.png';
import Calender from '../assets/calender.jpeg'

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="Habit Tracker Logo" />
          <h1>Habit Tracker</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/my-habits">My Habits</a></li>
            <li><a href="/statistics">Statistics</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
          <button className="sign-in-btn">Sign In / Sign Up</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Track Your Habits, Build Your Future</h2>
          <p>Consistency is key. Start tracking your daily habits and turn small steps into big changes!</p>
          <button className="cta-btn">Get Started Now</button>
        </div>
        <div className="hero-image">
          <img src={Calender} alt="Habit Tracking Illustration" />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <img src="/icon-habit.png" alt="Add Habit" />
          <h3>Simple Habit Creation</h3>
          <p>Easily add habits with a daily, weekly, or custom frequency.</p>
        </div>
        <div className="feature">
          <img src="/icon-progress.png" alt="Progress Tracking" />
          <h3>Progress Tracking</h3>
          <p>Visualize your progress with charts and streaks.</p>
        </div>
        <div className="feature">
          <img src="/icon-reminder.png" alt="Reminders" />
          <h3>Reminders & Notifications</h3>
          <p>Stay on top of your goals with timely notifications.</p>
        </div>
        <div className="feature">
          <img src="/icon-goals.png" alt="Personalized Goals" />
          <h3>Personalized Goals</h3>
          <p>Set goals that fit your life and track them over time.</p>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"Habit Tracker has helped me stay consistent and achieve my goals like never before!"</p>
          <p>— Sarah, daily user</p>
        </div>
        <div className="testimonial">
          <p>"This app transformed the way I approach my daily routine."</p>
          <p>— Jake, user for 6 months</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About Us</a> | <a href="/privacy">Privacy Policy</a> | <a href="/contact">Contact Support</a>
        </div>
        <div className="social-media">
          <a href="https://facebook.com"><img src="/icon-facebook.png" alt="Facebook" /></a>
          <a href="https://twitter.com"><img src="/icon-twitter.png" alt="Twitter" /></a>
          <a href="https://instagram.com"><img src="/icon-instagram.png" alt="Instagram" /></a>
        </div>
        <p>© 2024 Habit Tracker</p>
      </footer>
    </div>
  );
};

export default HomePage;
