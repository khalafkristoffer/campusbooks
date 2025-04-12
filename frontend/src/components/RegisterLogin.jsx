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
        const response = await apiClient.post("/auth/register", {
          email: email,
          password: password,
          phone_number: phoneNumber,
        });

        if (response.status !== 201) {
          setErrorMessage("Registration failed");
          console.error("Registration failed:", response.data);
          setLoading(false);
          return;
        }

        console.log("Registration successful:", response.data);
        navigate("/login");
      } catch (error) {
        // Format the error message
        const errorDetail = error.response?.data?.detail;
        let formattedErrorMessage = "Error during registration";

        if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => err.msg)
            .join(", "); // Join error messages
        } else if (typeof errorDetail === "string") {
          formattedErrorMessage = errorDetail;
        }

        setErrorMessage(formattedErrorMessage);
        console.error("Error during registration:", error);
      } finally {
        setLoading(false);
      }
    } else {
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

        if (response.status !== 200) {
          setErrorMessage("Login failed");
          console.error("Login failed:", response.data);
          setLoading(false);
          return;
        }

        const responseData = response.data;
        console.log("Login successful:", responseData);
        
        // Use the context's login function instead of setting cookies directly
        login(responseData.access_token);
        
        navigate("/");
      } catch (error) {
        // Format the error message
        const errorDetail = error.response?.data?.detail;
        let formattedErrorMessage = "Error during login";

        if (Array.isArray(errorDetail)) {
          formattedErrorMessage = errorDetail
            .map((err) => err.msg)
            .join(", "); // Join error messages
        } else if (typeof errorDetail === "string") {
          formattedErrorMessage = errorDetail;
        }

        setErrorMessage(formattedErrorMessage);
        console.error("Error during login:", error);
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
                type="phonenumber"
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