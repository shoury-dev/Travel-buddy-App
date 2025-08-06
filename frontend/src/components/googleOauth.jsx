import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../apis';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const clientId = "75710238586-ak26dkipvhtl7v3u2djemqtieag53t4n.apps.googleusercontent.com";
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          fetch(`${BASE_URL}/auth/google-auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentialResponse),
            credentials: "include"
          })
          .then(response => response.json())
          .then((data) => {
            if (data.token) {
              toast.success("Logged in successfully!");
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("isLoggedIn", "true");
              setTimeout(() => navigate("/dashboard"), 2000);
            }
          })
          .catch(error => {
            console.error('Google login error:', error);
            toast.error("Error logging in");
          });
        }}
        onError={() => {
          toast.error("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
 };
export default GoogleAuth;