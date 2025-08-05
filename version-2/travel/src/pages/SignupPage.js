import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignupPage.css';

const SignupPage = () => {
  return (
    <div className="main-container">
      <div className="overlay"></div>
      <SignupCard />
    </div>
  );
};

const SignupCard = () => {
  return (
    <div className="login-card">
      <div className="branding-section">
        <div>
          <h1 className="logo">Tripglo</h1>
          <p className="join-text">Start Your Journey</p>
          <h2 className="tagline">
            Join Our Travel Community
            <br />
            Find Your Perfect Travel Companion
          </h2>
        </div>
      </div>

      <div className="form-section">
        <SignupForm />
      </div>
    </div>
  );
};

const SignupForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const checkPasswordStrength = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;

    return { hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough };
  };

  const passwordRequirements = checkPasswordStrength(password);

  return (
    <div className="form-content">
      <div className="input-group">
        <input
          type="text"
          placeholder="First Name"
          className="input-field"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field"
        />
      </div>

      <input
        type="email"
        placeholder="Email Address"
        className="input-field"
      />

      <input
        type="password"
        placeholder="Create Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ul className="password-requirements">
        <li className={passwordRequirements.isLongEnough ? 'requirement-met' : ''}>
          At least 8 characters
        </li>
        <li className={passwordRequirements.hasUpperCase ? 'requirement-met' : ''}>
          One uppercase letter
        </li>
        <li className={passwordRequirements.hasLowerCase ? 'requirement-met' : ''}>
          One lowercase letter
        </li>
        <li className={passwordRequirements.hasNumbers ? 'requirement-met' : ''}>
          One number
        </li>
        <li className={passwordRequirements.hasSpecialChar ? 'requirement-met' : ''}>
          One special character
        </li>
      </ul>

      <input
        type="password"
        placeholder="Confirm Password"
        className="input-field"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="links-container">
        <Link to="/" className="link">Already have an account?</Link>
      </div>

      <button className="login-button">Create Account</button>
    </div>
  );
};

export default SignupPage;