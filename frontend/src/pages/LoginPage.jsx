import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const SignupSection = ({setstate}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPasswordStrength = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
    };
  };

  const passwordRequirements = checkPasswordStrength(password);

  return (
    <div className="form-content">
      <div className="input-group">
        <input type="text" placeholder="First Name" className="input-field" />
        <input type="text" placeholder="Last Name" className="input-field" />
      </div>

      <input type="email" placeholder="Email Address" className="input-field" />

      <input
        type="password"
        placeholder="Create Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ul className="password-requirements">
        <li
          className={passwordRequirements.isLongEnough ? "requirement-met" : ""}
        >
          At least 8 characters
        </li>
        <li
          className={passwordRequirements.hasUpperCase ? "requirement-met" : ""}
        >
          One uppercase letter
        </li>
        <li
          className={passwordRequirements.hasLowerCase ? "requirement-met" : ""}
        >
          One lowercase letter
        </li>
        <li
          className={passwordRequirements.hasNumbers ? "requirement-met" : ""}
        >
          One number
        </li>
        <li
          className={
            passwordRequirements.hasSpecialChar ? "requirement-met" : ""
          }
        >
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
        <div to="/" className="link" onClick={() => setstate(0)}>
          Already have an account?
        </div>
      </div>

      <button className="login-button">Create Account</button>
    </div>
  );
};

const LoginSection = ({setstate}) => {
  return (
    <div className="form-section">
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
          <div to="/signup" className="link" onClick={() => setstate(1)}>
            Create Account
          </div>
        </div>
        <button className="login-button">Log in</button>

        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">OR</span>
          <hr className="divider-line" />
        </div>

        <button className="google-login-button">
          <img
            src="/src/assets/google-icon.svg"
            alt="Google Logo"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [state, setState] = useState(0);

  return (
    <div className="main-container">
      <div className="overlay"></div>
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

        {state === 0
        ? <LoginSection setstate={setState}/>
        : <SignupSection setstate={setState} />
        }

      </div>
    </div>
  );
};

export default LoginPage;
