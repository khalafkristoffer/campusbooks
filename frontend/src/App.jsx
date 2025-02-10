// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";
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
          <SearchAndFilter />
          <BookList books={books} />
        </>
      ) : (
        <SellSection />
      )}
    </div>
  );
}

function App() {
  const [isSeller, setIsSeller] = useState(false);

  // Sample books array with "id", "author", and "kurskod"
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
    // Add more books as needed...
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
