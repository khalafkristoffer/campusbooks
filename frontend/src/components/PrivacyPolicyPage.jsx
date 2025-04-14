// src/components/PrivacyPolicyPage.jsx
import React from 'react';
import '../styles/global.css';
import '../styles/policy-pages.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="container page-content">
      <h1>Integritetspolicy</h1>
      
      <section className="policy-section">
        <h2>Översikt</h2>
        <p>
          Din integritet är viktig för oss på ChalmerShelf. Vi samlar endast in den information 
          som är nödvändig för att du ska kunna använda vår tjänst för att köpa och sälja kurslitteratur.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Information vi samlar in</h2>
        <p>När du använder ChalmerShelf samlar vi endast in:</p>
        <ul>
          <li>E-postadress (för inloggning och kontakt)</li>
          <li>Lösenord (krypterat)</li>
          <li>Telefonnummer (valfritt, enbart för att underlätta kontakt mellan användare)</li>
        </ul>
        <p>Vi sparar också information om böcker du lägger ut till försäljning.</p>
      </section>
      
      <section className="policy-section">
        <h2>Hur vi använder informationen</h2>
        <p>Vi använder informationen endast för att:</p>
        <ul>
          <li>Låta dig logga in på ditt konto</li>
          <li>Möjliggöra kontakt mellan köpare och säljare</li>
          <li>Visa dina böcker till försäljning</li>
        </ul>
        <p>Vi säljer aldrig dina personuppgifter till tredje part och använder dem inte för marknadsföring.</p>
      </section>
      
      <section className="policy-section">
        <h2>Cookies</h2>
        <p>
          Vi använder endast nödvändiga cookies för att hålla dig inloggad på tjänsten.
        </p>
      </section>
      
      

    </div>
  );
};

export default PrivacyPolicyPage;