// src/App.jsx
import { useState, useEffect } from "react"; // Remove React import
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Header from "./components/Header";
import Button from "./components/Button";
import BuyInstructions from "./components/BuyInstructions";
import SellInstructions from "./components/SellInstructions";
import SearchAndFilter from "./components/SearchAndFilter";
import BookList from "./components/BookList";
import SellSection from "./components/SellSection";
import BookDetails from "./components/BookDetails";
import Footer from "./components/Footer";
import RegisterLogin from "./components/RegisterLogin";
import UserProfile from "./components/UserProfile";
// Import new footer page components
import AboutPage from "./components/AboutPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsPage from "./components/TermsPage";
import CookiesPage from "./components/CookiesPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import "./styles/user-profile.css"; // Import new user profile styles
import apiClient from "./api/client";

const queryClient = new QueryClient(); // Create a QueryClient instance

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('access_token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function HomePage({ isSeller, setIsSeller, books, onFilterChange }) {
  return (
    <div>
      <div className="toggle-buttons">
        <Button
          className={isSeller ? "button-secondary" : "button-primary"}
          onClick={() => setIsSeller(false)} // This now calls setSellerMode(false) via auth
        >
          Köpare
        </Button>
        <Button
          className={!isSeller ? "button-secondary" : "button-primary"}
          onClick={() => setIsSeller(true)} // This now calls setSellerMode(true) via auth context
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

function AppContent() { // Wrap main App logic in a component inside AuthProvider
  const { isSeller, setSellerMode } = useAuth(); // Get state and setter from context

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.courseCode) params.append("course_code", filters.courseCode);
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split("-");
          params.append("price_min", parseInt(min));
          params.append("price_max", parseInt(max));
        }
        if (filters.condition) params.append("condition", filters.condition);
        if (filters.location) params.append("location", filters.location);
        if (filters.searchTerm) params.append("title", filters.searchTerm);

        let url = "/books/";
        if (params.toString()) url += `?${params.toString()}`;

        const response = await apiClient.get(url);
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <Header />
      <div className="page-container">
        <div className="content-wrap">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isSeller={isSeller} // Use context state
                    setIsSeller={setSellerMode} // Pass context setter
                    books={books}
                    onFilterChange={handleFilterChange}
                  />
                }
              />
              <Route path="/books/id/:id" element={<BookDetails />} /> {/* Updated to match the URL pattern */}
              <Route path="/login" element={<RegisterLogin />} />
              <Route path="/register" element={<RegisterLogin />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

// Main App component now just sets up providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent /> {/* Render main content */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
