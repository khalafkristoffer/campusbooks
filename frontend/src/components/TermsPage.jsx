// src/components/TermsPage.jsx
import React from 'react';
import '../styles/global.css';
import '../styles/policy-pages.css';

const TermsPage = () => {
  return (
    <div className="container page-content">
      <h1>Användarvillkor</h1>
      
      <section className="policy-section">
        <h2>Välkommen till ChalmerShelf</h2>
        <p>
          ChalmerShelf är en plattform där studenter kan köpa och sälja kurslitteratur. 
          Genom att använda vår tjänst godkänner du dessa användarvillkor.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Användarkonton</h2>
        <p>
          För att använda ChalmerShelf behöver du skapa ett konto med en giltig e-postadress.
          Du ansvarar för att hålla ditt lösenord säkert och för all aktivitet som sker under ditt konto.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Böcker och annonser</h2>
        <p>Som användare av ChalmerShelf förbinder du dig att:</p>
        <ul>
          <li>Endast sälja böcker som du äger</li>
          <li>Ge en korrekt beskrivning av bokens skick</li>
          <li>Ange ett rimligt pris</li>
          <li>Följa genom med försäljningen när en köpare tar kontakt</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Köp och försäljning</h2>
        <p>
          ChalmerShelf tillhandahåller endast en plattform där användare kan hitta varandra. 
          Vi är inte involverade i transaktioner mellan användare och tar inget ansvar för problem 
          som kan uppstå vid köp eller försäljning.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Ansvarsbegränsning</h2>
        <p>
          ChalmerShelf tillhandahålls i befintligt skick utan garantier. 
          Vi ansvarar inte för innehåll som användare publicerar på plattformen eller 
          för problem som uppstår mellan köpare och säljare.
        </p>
      </section>
      
  
  
    </div>
  );
};

export default TermsPage;