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
          Din integritet är viktig för oss på ChalmerShelf. Denna integritetspolicy förklarar 
          vilken information vi samlar in, hur vi använder den och dina rättigheter.
        </p>
        <p>
          Genom att använda vår tjänst accepterar du vår integritetspolicy och vår 
          behandling av dina personuppgifter enligt denna policy.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Information vi samlar in</h2>
        <h3>Personuppgifter</h3>
        <p>När du registrerar dig på ChalmerShelf samlar vi in:</p>
        <ul>
          <li>E-postadress</li>
          <li>Lösenord (krypterat)</li>
          <li>Telefonnummer (valfritt)</li>
        </ul>
        
        <h3>Användningsinformation</h3>
        <p>Vi samlar också in information om hur du använder vår tjänst, bland annat:</p>
        <ul>
          <li>Uppgifter om böcker du lägger upp till försäljning</li>
          <li>Köp- och säljaktiviteter</li>
          <li>Inloggningshistorik</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Hur vi använder informationen</h2>
        <p>Vi använder den insamlade informationen för att:</p>
        <ul>
          <li>Tillhandahålla, upprätthålla och förbättra vår tjänst</li>
          <li>Möjliggöra kommunikation mellan köpare och säljare</li>
          <li>Skicka servicemeddelanden och uppdateringar</li>
          <li>Förhindra bedrägerier och öka säkerheten</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Delning av information</h2>
        <p>
          Vi delar inte dina personuppgifter med tredje part utan ditt samtycke, förutom när:
        </p>
        <ul>
          <li>Det är nödvändigt för att erbjuda den tjänst du begärt (t.ex. kontaktinformation mellan köpare och säljare)</li>
          <li>Vi är skyldiga enligt lag</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Cookies</h2>
        <p>
          ChalmerShelf använder cookies för att förbättra användarupplevelsen och för att 
          komma ihåg dina inloggningsuppgifter. För mer information, se vår <a href="/cookies">Cookie-policy</a>.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Dina rättigheter</h2>
        <p>Som användare har du rätt att:</p>
        <ul>
          <li>Få tillgång till dina personuppgifter</li>
          <li>Begära rättelse av felaktiga uppgifter</li>
          <li>Begära radering av dina uppgifter</li>
          <li>Invända mot viss behandling av dina uppgifter</li>
          <li>Begära dataportabilitet</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>Kontakt</h2>
        <p>
          Om du har frågor om vår integritetspolicy eller hur vi behandlar dina uppgifter, 
          vänligen kontakta oss på <a href="mailto:privacy@chalmershelf.se">privacy@chalmershelf.se</a>.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>Uppdateringar</h2>
        <p>
          Vi kan komma att uppdatera denna policy. Senast uppdaterad: 13 april 2025.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;