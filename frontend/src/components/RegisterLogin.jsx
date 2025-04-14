import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/register-login.css";
import apiClient from "../api/client";
import querystring from 'querystring';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const RegisterLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    setLoading(true);

    if (isRegistering) {
      const confirmPassword = e.target.confirmPassword.value;
      const phoneNumber = e.target.phoneNumber?.value || null;

      if (password !== confirmPassword) {
        setErrorMessage("Lösenorden matchar inte");
        setLoading(false);
        return;
      }
      try {
        // --- Registration Request ---
        const registerResponse = await apiClient.post("/auth/register", {
          email: email,
          password: password,
          phone_number: phoneNumber,
        });

        // Check if registration itself failed (e.g., email already exists)
        // fastapi-users usually returns 201 on success
        if (registerResponse.status !== 201) {
           // Use error detail if available, otherwise generic message
           const errorDetail = registerResponse.data?.detail;
           let formattedErrorMessage = "Registrering misslyckades";
           
           if (typeof errorDetail === "string") {
               // Translate common error messages to Swedish
               if (errorDetail.includes("already exists")) {
                 formattedErrorMessage = "Kontot finns redan";
               } else if (errorDetail.includes("phone_number")) {
                 formattedErrorMessage = "Telefonnumret används redan";
               } else {
                 formattedErrorMessage = errorDetail;
               }
           } else if (Array.isArray(errorDetail)) {
               formattedErrorMessage = errorDetail.map(err => {
                 if (err.msg && err.msg.includes("email")) {
                   return "Ogiltig e-postadress";
                 } else if (err.msg && err.msg.includes("phone")) {
                   return "Ogiltigt telefonnummer";
                 }
                 return err.msg;
               }).join(", ");
           }
           setErrorMessage(formattedErrorMessage);
           console.error("Registration failed:", registerResponse.data);
           setLoading(false);
           return;
        }

        console.log("Registration successful:", registerResponse.data);

        // --- Automatic Login Attempt ---
        console.log("Attempting automatic login...");
        try {
          const loginData = querystring.stringify({
            username: email, // Use the email entered during registration
            password: password, // Use the password entered during registration
          });

          const loginResponse = await apiClient.post("/auth/jwt/login", loginData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });

          if (loginResponse.status === 200 && loginResponse.data.access_token) {
            console.log("Automatic login successful:", loginResponse.data);
            login(loginResponse.data.access_token); // Use context login function
            navigate("/"); // Navigate to home page after successful login
          } else {
            // Handle cases where auto-login fails (e.g., account needs verification)
            setErrorMessage("Registrering lyckades, men automatisk inloggning misslyckades. Vänligen logga in manuellt.");
            console.error("Automatic login failed:", loginResponse.data);
            navigate("/login"); // Redirect to login page if auto-login fails
          }
        } catch (loginError) {
           // Handle errors during the automatic login attempt
           const errorDetail = loginError.response?.data?.detail || "Okänt inloggningsfel";
           let formattedErrorMessage = "Registrering lyckades, men automatisk inloggning misslyckades";
           if (typeof errorDetail === "string") {
               formattedErrorMessage += `: ${errorDetail}`;
           } else if (Array.isArray(errorDetail)) {
               formattedErrorMessage += `: ${errorDetail.map(err => err.msg).join(", ")}`;
           }
           setErrorMessage(formattedErrorMessage);
           console.error("Error during automatic login:", loginError);
           navigate("/login"); // Redirect to login page on error
        }

      } catch (registerError) {
        // Format the registration error message
        const errorDetail = registerError.response?.data?.detail;
        let formattedErrorMessage = "Ett fel uppstod vid registreringen";

        // Check for network errors first
        if (registerError.code === 'ERR_NETWORK' || registerError.message === 'Network Error') {
          // If we're getting a network error when trying to register, it's likely the server encountered
          // an unhandled error with phone number uniqueness constraint
          const phoneNumber = e.target.phoneNumber?.value;
          if (phoneNumber) {
            formattedErrorMessage = "Telefonnumret används redan av en annan användare";
            console.error("Network error during registration, likely a phone number conflict:", registerError);
          } else {
            formattedErrorMessage = "Kunde inte ansluta till servern. Försök igen senare.";
            console.error("Network error during registration:", registerError);
          }
        } else if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => {
              if (err.msg && err.msg.includes("email")) {
                return "Ogiltig e-postadress";
              } else if (err.msg && err.msg.includes("password")) {
                return "Lösenordet uppfyller inte kraven";
              } else if (err.msg && err.msg.includes("phone")) {
                return "Ogiltigt telefonnummer";
              }
              return err.msg;
            })
            .join(", ");
        } else if (typeof errorDetail === "string") {
          // Translate common error messages to Swedish
          if (errorDetail.includes("already exists") && errorDetail.includes("email")) {
            formattedErrorMessage = "En användare med denna e-postadress finns redan";
          } else if (errorDetail.includes("phone_number")) {
            formattedErrorMessage = "Telefonnumret används redan";
          } else if (errorDetail === "REGISTER_USER_ALREADY_EXISTS") {
            formattedErrorMessage = "En användare med denna e-postadress finns redan";
          } else {
            formattedErrorMessage = errorDetail;
          }
        } else if (registerError.response?.status === 500 || registerError.response?.status === 400) {
          // Check for internal server errors that might be caused by duplicate phone number
          const errorString = JSON.stringify(registerError.response?.data || "").toLowerCase();
          if (errorString.includes("phone_number") && 
              (errorString.includes("unique") || errorString.includes("duplicate") || errorString.includes("already exists"))) {
            formattedErrorMessage = "Telefonnumret används redan av en annan användare";
          } else if (errorString.includes("internal server error")) {
            formattedErrorMessage = "Ett tekniskt fel uppstod. Försök igen senare.";
          }
        } else if (registerError.message) {
            formattedErrorMessage = registerError.message;
        }

        setErrorMessage(formattedErrorMessage);
        console.error("Error during registration:", registerError);
      } finally {
        setLoading(false);
      }
    } else {
      // --- Existing Login Logic ---
      try {
        const data = querystring.stringify({
          username: email,
          password: password,
        });

        const response = await apiClient.post("/auth/jwt/login", data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        // fastapi-users login returns 200 on success
        if (response.status !== 200 || !response.data.access_token) {
           const errorDetail = response.data?.detail || "Invalid credentials or other login error";
           setErrorMessage("Fel inloggning");
           console.error("Login failed:", response.data);
           setLoading(false);
           return;
        }

        const responseData = response.data;
        console.log("Login successful:", responseData);

        login(responseData.access_token); // Use context login function
        navigate("/"); // Navigate to home page

      } catch (error) {
        // Format the login error message
        const errorDetail = error.response?.data?.detail;
        let formattedErrorMessage = "Fel inloggning";

        if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => {
              if (err.msg && err.msg.includes("email")) {
                return "Ogiltig e-postadress";
              } else if (err.msg && err.msg.includes("password")) {
                return "Fel lösenord";
              }
              return err.msg;
            })
            .join(", ");
        } else if (typeof errorDetail === "string") {
          // Check for specific error messages
          if (errorDetail.includes("credentials") || errorDetail === "LOGIN_BAD_CREDENTIALS") {
            formattedErrorMessage = "Fel e-postadress eller lösenord";
          } else if (errorDetail.includes("verify")) {
            formattedErrorMessage = "Kontot måste verifieras först";
          } else {
            formattedErrorMessage = errorDetail;
          }
        } else if (error.message && error.message.includes("Network Error")) {
            formattedErrorMessage = "Kunde inte ansluta till servern";
        }

        setErrorMessage(formattedErrorMessage);
        console.error("Error during login:", error.response || error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-login-container">
      <h2>{isRegistering ? "Skapa ett konto" : "Välkommen"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        {isRegistering && (
          <>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number (optional)</label>
              <input
                type="tel" // Use type="tel" for phone numbers
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="button"
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            isRegistering ? "Create Account" : "Sign In"
          )}
        </Button>
      </form>
      <button onClick={toggleForm} className="toggle-form-button">
        {isRegistering
          ? "Already have an account? Sign in"
          : "Need an account? Create one"}
      </button>
    </div>
  );
};

export default RegisterLogin;