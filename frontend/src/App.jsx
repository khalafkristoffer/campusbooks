// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";
import BuyInstructions from "./components/BuyInstructions";
import SearchAndFilter from "./components/SearchAndFilter";
import BookList from "./components/BookList";
import SellSection from "./components/SellSection";
import BookDetails from "./components/BookDetails";
import Footer from "./components/Footer";

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
      id: 4,
      title: "Matematik 101",
      author: "Anna Andersson",
      kurskod: "MATH101",
      condition: "Used",
      price: 150,
      originalPrice: 300,
      location: "Campus",
      image: "",
      description: "A detailed description of Matematik 101.",
    },
    {
      id: 5,
      title: "Fysikens Grundprinciper",
      author: "Oskar Olsson",
      kurskod: "FYS100",
      condition: "Good",
      price: 200,
      originalPrice: 400,
      location: "Biblioteket",
      image: "",
      description: "A detailed description of Fysikens Grundprinciper.",
    },
    {
      id: 6,
      title: "Kemi för nybörjare",
      author: "Elsa Eriksson",
      kurskod: "KEM101",
      condition: "Excellent",
      price: 100,
      originalPrice: 250,
      location: "Lab",
      image: "",
      description: "A detailed description of Kemi för nybörjare.",
    },
    {
      id: 7,
      title: "Historia av Europa",
      author: "Fredrik Fransson",
      kurskod: "HIS201",
      condition: "Good",
      price: 180,
      originalPrice: 350,
      location: "Campus",
      image: "",
      description: "A detailed description of Historia av Europa.",
    },
    {
      id: 8,
      title: "Svenska Litteraturen",
      author: "Ingrid Ivarsson",
      kurskod: "SVL101",
      condition: "Used",
      price: 220,
      originalPrice: 500,
      location: "Biblioteket",
      image: "",
      description: "A detailed description of Svenska Litteraturen.",
    },
    {
      id: 9,
      title: "Datateknikens Grunder",
      author: "Johan Johansson",
      kurskod: "DAT101",
      condition: "Excellent",
      price: 400,
      originalPrice: 900,
      location: "Campus",
      image: "",
      description: "A detailed description of Datateknikens Grunder.",
    },
    {
      id: 10,
      title: "Ekonomiska Principer",
      author: "Klara Karlsson",
      kurskod: "EKO101",
      condition: "Good",
      price: 350,
      originalPrice: 700,
      location: "Online",
      image: "",
      description: "A detailed description of Ekonomiska Principer.",
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
