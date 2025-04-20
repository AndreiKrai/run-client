import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import LoginModal from "../Modal/LoginModal/LoginModal";
import RegisterModal from "../Modal/RegisterModal/RegisterModal";
import "./Header.css";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };

  const handleOpenRegisterModal = () => {
    openModal(<RegisterModal />);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left section - Logo */}
        <div className="logo-section">
          <Link to="/" className="logo">
            Run4Fun
          </Link>
        </div>

        {/* Center section - Navigation */}
        <nav className={`nav-section ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Right section - Auth */}
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="username">
                {user?.profile?.name || user?.email}
              </span>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="dropdown-item logout-button"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-text" onClick={handleOpenLoginModal}>
                Log In
              </button>
              <button
                className="btn btn-primary"
                onClick={handleOpenRegisterModal}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;