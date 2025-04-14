// src/components/CookiesPage.jsx
import React from 'react';
import '../styles/global.css';
import '../styles/policy-pages.css';

const CookiesPage = () => {
  return (
    <div className="container page-content">
      <h1>Cookie-policy</h1>
      
      <section className="policy-section">
        <h2>Vad är cookies?</h2>
        <p>
          Cookies är små textfiler som lagras på din dator eller mobila enhet när du besöker 
          en webbplats. De hjälper webbplatsen att komma ihåg dina inställningar och preferenser, 
          vilket förbättrar din upplevelse.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Hur ChalmerShelf använder cookies</h2>
        <p>Vi använder cookies för att:</p>
        <ul>
          <li>Hålla dig inloggad på ditt konto</li>
          <li>Komma ihåg dina inställningar och preferenser</li>
          <li>Möjliggöra grundläggande funktioner som navigering och åtkomst till säkra områden</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Typer av cookies vi använder</h2>
        
        <h3>Nödvändiga cookies</h3>
        <p>
          Dessa cookies behövs för att webbplatsen ska fungera och kan inte stängas av i våra system. 
          De används bland annat för att hålla dig inloggad och för att komma ihåg dina val.
        </p>
        
        <h3>Funktionella cookies</h3>
        <p>
          Dessa cookies möjliggör förbättrad funktionalitet och anpassning, som att komma ihåg dina inställningar.
        </p>
        
      </section>
      
      <section className="policy-section">
        <h2>Hantera cookies</h2>
        <p>
          Du kan kontrollera och hantera cookies på olika sätt:
        </p>
        <ul>
          <li>
            <strong>Webbläsarinställningar:</strong> De flesta webbläsare låter dig hantera cookies 
            via dina inställningar. Du kan blockera cookies eller ta bort dem.
          </li>
          <li>
            <strong>Tredjepartsverktyg:</strong> Det finns verktyg för att hantera cookies och annonsval.
          </li>
        </ul>
        <p>
          Observera att om du blockerar vissa cookies kan delar av webbplatsen inte fungera korrekt.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Cookies från tredje part</h2>
        <p>
          Vi använder begränsade tredjepartstjänster på vår webbplats, till exempel:
        </p>
        <ul>
          <li>Google Analytics för att förstå användarbeteende</li>
          <li>Sociala medier-knappar som kan sätta cookies för att spåra din användning</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Uppdateringar i cookie-policyn</h2>
        <p>
          Vi kan uppdatera denna cookie-policy när som helst. Eventuella ändringar kommer att publiceras på denna sida.
        </p>
        <p className="last-updated">
          Senast uppdaterad: 13 april 2025
        </p>
      </section>

    </div>
  );
};

export default CookiesPage;