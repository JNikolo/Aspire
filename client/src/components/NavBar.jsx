import { react } from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export const NavBar = () => {
  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        {/* dropdown will be visible in md and sm screens */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          {/* access dashboard and communities pages */}
          <ult
            abIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/communities">Communities</Link>
            </li>
          </ult>
        </div>
        {/* logo */}
        <a className="flex items-center">
          <img src="/aspire.jpg" alt="Aspire Logo" className="h-10 w-auto" />
        </a>
      </div>
      {/* navbar items on lg screen */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-brown-dark">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/communities">Communities</Link>
          </li>
        </ul>
      </div>
      {/* logout from clerk */}
      <div className="navbar-end">
        <ul>
          <li>
            {/* afte logout, bring user to landing page */}
            <UserButton afterSignOutUrl="/landing" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
