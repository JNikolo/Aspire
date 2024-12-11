import React from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export const NavBar = () => {
  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        <details className="dropdown lg:hidden">
          <summary className="btn btn-ghost cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </summary>
          <ul className="menu menu-sm dropdown-content bg-white rounded-box z-[50] mt-3 w-52 p-2 shadow text-brown-dark">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/communities">Communities</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </details>
        {/* Logo */}
        <a className="flex items-center">
          <img src="/aspire.jpg" alt="Aspire Logo" className="h-10 w-auto" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-brown-dark">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/communities">Communities</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul>
          <li>
            <UserButton afterSignOutUrl="/" showName userProfileMode="modal" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
