import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../apis";
import GoogleAuth from "../components/googleOauth";
import "./LoginPage.css";

const SignupSection = ({setstate}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const passwordRequirements = checkPasswordStrength(formData.password);
    const isValidPassword = Object.values(passwordRequirements).every(req => req);
    
    if (!isValidPassword) {
      alert("Password doesn't meet all requirements!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/travel_buddy/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully! Please login.');
        setstate(0); // Switch to login form
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const passwordRequirements = checkPasswordStrength(formData.password);

  return (
    <div className="form-content">
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            className="input-field"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name" 
            className="input-field"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <input 
          type="email" 
          name="email"
          placeholder="Email Address" 
          className="input-field"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <ul className="password-requirements">
          <li className={passwordRequirements.isLongEnough ? "requirement-met" : ""}>
            At least 8 characters
          </li>
          <li className={passwordRequirements.hasUpperCase ? "requirement-met" : ""}>
            One uppercase letter
          </li>
          <li className={passwordRequirements.hasLowerCase ? "requirement-met" : ""}>
            One lowercase letter
          </li>
          <li className={passwordRequirements.hasNumbers ? "requirement-met" : ""}>
            One number
          </li>
          <li className={passwordRequirements.hasSpecialChar ? "requirement-met" : ""}>
            One special character
          </li>
        </ul>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input-field"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        <div className="links-container">
          <div className="link" onClick={() => setstate(0)}>
            Already have an account?
          </div>
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

const LoginSection = ({setstate}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/travel_buddy/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data and token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard or home
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <div className="form-content">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="links-container">
            <Link to="/forgot-password" className="link">
              Forget Password
            </Link>
            <div className="link" onClick={() => setstate(1)}>
              Create Account
            </div>
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">OR</span>
          <hr className="divider-line" />
        </div>

        <GoogleAuth />
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
