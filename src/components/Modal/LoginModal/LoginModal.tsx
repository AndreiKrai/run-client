import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useModal } from "../../../context/ModalContext";
import "../ModalForms.css";

const LoginModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { closeModal, openModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        closeModal();
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    import("../RegisterModal/RegisterModal").then(({ default: RegisterModal }) => {
      openModal(<RegisterModal />);
    });
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert("Forgot password functionality not implemented yet.");
  };

  return (
    <div className="modal-form login-form">
      <h2>Log In</h2>
      <p className="form-subtitle">Welcome back to Run4Fun!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="form-extras">
          <button 
            type="button" 
            className="text-button" 
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      
      <div className="form-footer">
        <p>
          Don't have an account?{" "}
          <button 
            type="button" 
            className="text-button" 
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;