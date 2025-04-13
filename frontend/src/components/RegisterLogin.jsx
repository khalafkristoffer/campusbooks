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
        setErrorMessage("Passwords do not match");
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
           let formattedErrorMessage = "Registration failed";
           if (typeof errorDetail === "string") {
               formattedErrorMessage = errorDetail;
           } else if (Array.isArray(errorDetail)) {
               formattedErrorMessage = errorDetail.map(err => err.msg).join(", ");
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
            setErrorMessage("Registration successful, but auto-login failed. Please log in manually.");
            console.error("Automatic login failed:", loginResponse.data);
            navigate("/login"); // Redirect to login page if auto-login fails
          }
        } catch (loginError) {
           // Handle errors during the automatic login attempt
           const errorDetail = loginError.response?.data?.detail || "Unknown login error";
           let formattedErrorMessage = "Registration successful, but auto-login failed";
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
        let formattedErrorMessage = "Error during registration";

        if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => err.msg)
            .join(", ");
        } else if (typeof errorDetail === "string") {
          formattedErrorMessage = errorDetail;
        } else if (registerError.message) {
            formattedErrorMessage = registerError.message;
        }

        setErrorMessage(formattedErrorMessage);
        console.error("Error during registration:", registerError.response || registerError);
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
           setErrorMessage(typeof errorDetail === 'string' ? errorDetail : "Login failed");
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
        let formattedErrorMessage = "Error during login";

        if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => err.msg)
            .join(", ");
        } else if (typeof errorDetail === "string") {
          formattedErrorMessage = errorDetail;
        } else if (error.message) {
            formattedErrorMessage = error.message;
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
      <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
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