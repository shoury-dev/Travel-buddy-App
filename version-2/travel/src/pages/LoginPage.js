import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="main-container">
      <div className="overlay"></div>
      <LoginCard />
    </div>
  );
};

const LoginCard = () => {
  return (
    <div className="login-card">
      <div className="branding-section">
        <div>
          <h1 className="logo">Tripglo</h1>
          <p className="join-text">Join for free</p>
          <h2 className="tagline">
            Unleash the Travel inside YOU, Do not need to beg ANYONE!
            <br />
            We will Connect YOU With New BUDDY
          </h2>
        </div>
      </div>

      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <div className="form-content">
      <input
        type="email"
        placeholder="chatterjee.sangram07@gmail.com"
        className="input-field"
      />
      <input
        type="password"
        placeholder="**********"
        className="input-field"
      />
      <div className="links-container">
        <Link to="/forgot-password" className="link">
          Forget Password
        </Link>
        <Link to="/signup" className="link">
          Create Account
        </Link>
      </div>
      <button className="login-button">Log in</button>
    </div>
  );
};

export default LoginPage;