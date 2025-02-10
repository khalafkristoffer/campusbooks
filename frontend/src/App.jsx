import { useState } from "react";
import "./styles/styles.css"; 

function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="book-card">
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

function Logo() {
  return (
    <div className="header">
      <h1 className="logo">📖 Chalmershelf</h1>
      <p className="subtitle">Spara pengar, dela kunskap – Chalmers egen bokmarknad</p>
    </div>
  );
}

export default function BookMarketplace() {
  const [isSeller, setIsSeller] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const books = [
    { title: "Datornätverk", author: "Lars Pettersson", courseCode: "EDA450", price: 320, originalPrice: 750, location: "Hubben", condition: "Bra skick" },
    { title: "Maskininlärningens Grunder", author: "Maria Svensson", courseCode: "ML400", price: 500, originalPrice: 1000, location: "Biblioteket", condition: "Nyskick" },
    { title: "Webbutveckling med React", author: "Karin Lindström", courseCode: "TDA567", price: 350, originalPrice: 800, location: "Lindholmen", condition: "Använd" },
    { title: "Algoritmer och Datastrukturer", author: "Johan Åberg", courseCode: "DAT300", price: 275, originalPrice: 600, location: "Maskinhuset", condition: "Bra skick" },
    { title: "Grundläggande Fysik", author: "Erik Lundqvist", courseCode: "FYS101", price: 150, originalPrice: 500, location: "Kårhuset", condition: "Använd" },
    { title: "Artificiell Intelligens", author: "Sofie Berg", courseCode: "AI600", price: 600, originalPrice: 1200, location: "Chalmers Café", condition: "Nyskick" }
  ];

  return (
    <div className="container">
      <Logo />

      <div className="toggle-buttons">
        <Button className={isSeller ? "button-secondary" : "button-primary"} onClick={() => setIsSeller(false)}>Köpare</Button>
        <Button className={!isSeller ? "button-secondary" : "button-primary"} onClick={() => setIsSeller(true)}>Säljare</Button>
      </div>

      {!isSeller ? (
        <>
          <input type="text" placeholder="📖 Hitta din kursbok" className="search-bar" />
          <div className="filters">
            <select><option>Filtrera kurskod</option><option>EDA450</option><option>ML400</option></select>
            <select><option>Filtrera pris</option><option>0-200 kr</option><option>200-500 kr</option></select>
            <select><option>Filtrera skick</option><option>Nyskick</option><option>Bra skick</option></select>
            <select><option>Filtrera plats</option><option>Hubben</option><option>Biblioteket</option></select>
          </div>

          <div className="books-grid">
            {books.map((book, index) => (
              <Card key={index}>
                <CardContent>
                  <h2 className="book-title">{book.title}</h2>
                  <p className="book-info">📘 Författare: {book.author}</p>
                  <p className="book-info">🎓 Kurskod: {book.courseCode}</p>
                  <p className="book-info">📖 Skick: {book.condition}</p>
                  <p className="book-price">💰 {book.price} kr <span className="book-original-price">{book.originalPrice} kr (Nypris)</span></p>
                  <p className="book-info">📍 {book.location}</p>
                  <Button className="button-primary" onClick={() => setChatOpen(true)}>💬 Chatta med säljare</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="sell-section">
          <p>Får du inte sålt din bok? Vi köper den!</p>
          <Button className="sell-button">📦 Sälj till oss</Button>
          <h2>Lägg upp en ny bok</h2>
          <input type="text" placeholder="Boktitel" />
          <input type="text" placeholder="Författare" />
          <input type="number" placeholder="Pris" />
          <Button className="button-primary">➕ Lägg upp boken</Button>
        </div>
      )}
    </div>
  );
}
