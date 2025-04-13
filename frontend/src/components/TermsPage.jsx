// src/components/TermsPage.jsx
import React from 'react';
import '../styles/global.css';
import '../styles/policy-pages.css';

const TermsPage = () => {
  return (
    <div className="container page-content">
      <h1>Användarvillkor</h1>
      
      <section className="policy-section">
        <p className="introduction">
          Välkommen till ChalmerShelf. Genom att använda vår hemsida och tjänst, 
          accepterar du följande användarvillkor. Vänligen läs dem noga.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>1. Användarens ansvar</h2>
        <p>
          Som användare av ChalmerShelf ansvarar du för att:
        </p>
        <ul>
          <li>Tillhandahålla korrekt och sanningsenlig information om dig själv och dina böcker</li>
          <li>Hålla ditt lösenord och kontoinformation säkra</li>
          <li>Inte använda tjänsten för olagliga eller oetiska aktiviteter</li>
          <li>Behandla andra användare med respekt i all kommunikation</li>
          <li>Endast lägga upp böcker du äger och har rätt att sälja</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>2. Beskrivning av tjänsten</h2>
        <p>
          ChalmerShelf är en plattform där studenter vid Chalmers kan köpa och sälja 
          kurslitteratur. Vi tillhandahåller en plattform för att koppla samman köpare och säljare, 
          men vi är inte involverade i själva köp- och säljprocessen.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>3. Köp och försäljning</h2>
        <p>När du använder ChalmerShelf för att köpa eller sälja böcker:</p>
        <ul>
          <li>Agerar ChalmerShelf endast som mellanhand för att hjälpa köpare och säljare att hitta varandra</li>
          <li>Ansvarar säljaren för att boken stämmer överens med beskrivningen</li>
          <li>Rekommenderar vi att köpare och säljare möts i säkra, offentliga miljöer för utbyte av böcker</li>
          <li>Är alla transaktioner och överenskommelser mellan köpare och säljare deras ansvar</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>4. Innehåll</h2>
        <p>
          När du lägger upp innehåll på ChalmerShelf (inklusive bokannonser, bilder och text):
        </p>
        <ul>
          <li>Behåller du äganderätten till ditt innehåll</li>
          <li>Ger du ChalmerShelf rätt att visa, kopiera och distribuera innehållet inom tjänsten</li>
          <li>Garanterar du att innehållet inte bryter mot upphovsrätt eller andra rättigheter</li>
        </ul>
        <p>
          Vi förbehåller oss rätten att ta bort innehåll som bryter mot våra riktlinjer.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>5. Kontoavslut</h2>
        <p>
          Vi förbehåller oss rätten att stänga av eller avsluta konton som bryter mot våra 
          användarvillkor eller agerar på ett sätt som kan skada ChalmerShelf eller andra användare.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>6. Ansvarsfriskrivning</h2>
        <p>
          ChalmerShelf tillhandahåller plattformen i "befintligt skick" utan garantier. 
          Vi ansvarar inte för böckernas kvalitet, möten mellan användare, eller problem 
          som kan uppstå vid transaktioner mellan användare.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>7. Ändringar i användarvillkoren</h2>
        <p>
          Vi förbehåller oss rätten att uppdatera dessa användarvillkor när som helst. 
          Vi kommer att meddela användare om betydande ändringar. Fortsatt användning av 
          tjänsten efter ändringar tolkas som accept av de nya villkoren.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>8. Kontakt</h2>
        <p>
          Om du har frågor om dessa användarvillkor, vänligen kontakta oss på 
          <a href="mailto:terms@chalmershelf.se"> terms@chalmershelf.se</a>.
        </p>
      </section>
      
      <section className="policy-section">
        <p className="last-updated">
          Senast uppdaterad: 13 april 2025
        </p>
      </section>
    </div>
  );
};

export default TermsPage;