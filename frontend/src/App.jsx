// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";
import BuyInstructions from "./components/BuyInstructions"; // New component for buy instructions
import SearchAndFilter from "./components/SearchAndFilter";
import BookList from "./components/BookList";
import SellSection from "./components/SellSection";
import BookDetails from "./components/BookDetails";
import Footer from "./components/Footer";
import "./styles/styles.css";

function HomePage({ isSeller, setIsSeller, books }) {
  return (
    <div>
      <Header />
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
      {!isSeller ? (
        <>
          <BuyInstructions />
          {/* Both the search/filter bar and the grid of books are in the same container */}
          <div className="search-filters-container">
            <SearchAndFilter />
            <BookList books={books} />
          </div>
        </>
      ) : (
        <SellSection />
      )}
    </div>
  );
}

function App() {
  const [isSeller, setIsSeller] = useState(false);

  // Keeping the duplicate book entries as provided
  const books = [
    {
      id: 1,
      title: "Datornätverk",
      author: "Lars Pettersson",
      kurskod: "EDA450",
      condition: "Good",
      price: 320,
      originalPrice: 750,
      location: "Hubben",
      image: "",
      description: "A detailed description of Datornätverk.",
    },
    {
      id: 2,
      title: "Maskininlärningens Grunder",
      author: "Maria Svensson",
      kurskod: "ML400",
      condition: "Excellent",
      price: 500,
      originalPrice: 1000,
      location: "Biblioteket",
      image: "",
      description: "A detailed description of Maskininlärningens Grunder.",
    },
    {
      id: 3,
      title: "Webbutveckling med React",
      author: "Karin Lindström",
      kurskod: "TDA567",
      condition: "Used",
      price: 350,
      originalPrice: 800,
      location: "Lindholmen",
      image: "",
      description: "A detailed description of Webbutveckling med React.",
    },
    {
      id: 1,
      title: "Datornätverk",
      author: "Lars Pettersson",
      kurskod: "EDA450",
      condition: "Good",
      price: 320,
      originalPrice: 750,
      location: "Hubben",
      image: "",
      description: "A detailed description of Datornätverk.",
    },
    {
      id: 2,
      title: "Maskininlärningens Grunder",
      author: "Maria Svensson",
      kurskod: "ML400",
      condition: "Excellent",
      price: 500,
      originalPrice: 1000,
      location: "Biblioteket",
      image: "",
      description: "A detailed description of Maskininlärningens Grunder.",
    },
    {
      id: 3,
      title: "Webbutveckling med React",
      author: "Karin Lindström",
      kurskod: "TDA567",
      condition: "Used",
      price: 350,
      originalPrice: 800,
      location: "Lindholmen",
      image: "",
      description: "A detailed description of Webbutveckling med React.",
    },
    {
      id: 2,
      title: "Maskininlärningens Grunder",
      author: "Maria Svensson",
      kurskod: "ML400",
      condition: "Excellent",
      price: 500,
      originalPrice: 1000,
      location: "Biblioteket",
      image: "",
      description: "A detailed description of Maskininlärningens Grunder.",
    },
    {
      id: 3,
      title: "Webbutveckling med React",
      author: "Karin Lindström",
      kurskod: "TDA567",
      condition: "Used",
      price: 350,
      originalPrice: 800,
      location: "Lindholmen",
      image: "",
      description: "A detailed description of Webbutveckling med React.",
    },
  ];

  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isSeller={isSeller}
                    setIsSeller={setIsSeller}
                    books={books}
                  />
                }
              />
              <Route path="/books/:id" element={<BookDetails books={books} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
