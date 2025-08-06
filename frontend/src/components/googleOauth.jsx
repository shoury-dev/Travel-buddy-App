import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import BASE from '../apis';
const GoogleAuth = () => {
 const clientId = process.env.clientId;
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
       onSuccess={credentialResponse => {
         fetch(BASE+"/google-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentialResponse),
            credentials: "include"
        })
        .then(response => response.json())
        .then((data) => {
          toast.success("Logged in")
          localStorage.setItem("User", data.user);
          localStorage.setItem("isLoggedIn", true);
          setTimeout(() => window.location.href = "/", 2000);
        }).catch(toast.error("Error Logging in"))
       }}
       onError={() => {
         toast.error("Login Failed");
       }}
     />
   </GoogleOAuthProvider>
   );
 };
export default GoogleAuth;