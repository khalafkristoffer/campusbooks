// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
import Header from "./components/Header";
import Button from "./components/Button";
import BuyInstructions from "./components/BuyInstructions";
import SellInstructions from "./components/SellInstructions"; // New component for seller instructions
import SearchAndFilter from "./components/SearchAndFilter";
import BookList from "./components/BookList";
import SellSection from "./components/SellSection";
import BookDetails from "./components/BookDetails";
import Footer from "./components/Footer";
import RegisterLogin from "./components/RegisterLogin";
import { getAllBooks } from "./api/books";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
// Import all modularized style files
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/buttons.css";
import "./styles/search.css";
import "./styles/books.css";
import "./styles/sell-section.css";
import "./styles/book-detail.css";
import "./styles/footer.css";
import "./styles/tutorial.css";
import "./styles/register-login.css";
import apiClient from "./api/client";

const queryClient = new QueryClient(); // Create a QueryClient instance

function HomePage({ isSeller, setIsSeller, books, onFilterChange }) {
  return (
    <div> 
      <div className="toggle-buttons">
        <Button
          className={isSeller ? "button-secondary" : "button-primary"}
          onClick={() => setIsSeller(false)}
        >
          Köpare
        </Button>
        <Button
          className={!isSeller ? "button-secondary" : "button-primary"}
          onClick={() => setIsSeller(true)}
        >
          Säljare
        </Button>
      </div>
      { !isSeller ? (
        <>
          <BuyInstructions />
          <SearchAndFilter onFilterChange={onFilterChange} />
          <BookList books={books} />
        </>
      ) : (
        <>
          <SellInstructions />
          <SellSection />
        </>
      )}
    </div>
  );
}

function App() {
  const [isSeller, setIsSeller] = useState(false);
  const [books, setBooks] = useState([]); // Initialize state for books
  const [filters, setFilters] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookieValue, setCookieValue] = useState(Cookies.get('access_token'));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.courseCode) {
          params.append("course_code", filters.courseCode);
        }
        if (filters.priceRange) {
          const priceRange = filters.priceRange;
          if (priceRange) {
            const [min, max] = priceRange.split("-");
            const minInt = parseInt(min);
            const maxInt = parseInt(max);
            if (!isNaN(minInt) && !isNaN(maxInt)) {
              params.append("price_min", minInt);
              params.append("price_max", maxInt);
            }
          } 
        }
        if (filters.condition) {
          params.append("condition", filters.condition);
        }
        if (filters.location) {
          params.append("location", filters.location);
        }
        if (filters.searchTerm) {
          params.append("title", filters.searchTerm);
        }

        let url = "/books/";
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await apiClient.get(url);
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [filters]); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Check for token in cookies on component mount
    const token = Cookies.get('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookieValue]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSetIsAuthenticated = (auth) => {
    setIsAuthenticated(auth);
    setCookieValue(Cookies.get('access_token'));
  }

  return (
    <QueryClientProvider client={queryClient}> {/* Wrap with react-query for caching */}
      <Router>
        <div className="page-container">
          <div className="content-wrap">
            <Header setIsAuthenticated={handleSetIsAuthenticated} /> 
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      isSeller={isSeller}
                      setIsSeller={setIsSeller}
                      books={books}
                      onFilterChange={handleFilterChange}
                    />
                  }
                />
                <Route path="/books/:id" element={<BookDetails books={books} />} />
                <Route path="/login" element={<RegisterLogin setIsAuthenticated={handleSetIsAuthenticated} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
