// src/components/AboutPage.jsx
import { useState, useEffect } from 'react';
import '../styles/global.css';
import '../styles/about-page.css';
import { FaGithub } from 'react-icons/fa';

const AboutPage = () => {
  const [contributors, setContributors] = useState([
    {
      username: 'khalafkristoffer',
      name: 'Kristoffer Khalaf',
      role: 'CEO',
      avatar: ''
    },
    {
      username: 'vim05',
      name: 'Victor Modig',
      role: 'CFO',
      avatar: ''
    },
    {
      username: 'danielzema',
      name: 'Daniel Zema',
      role: 'Frontend',
      avatar: ''
    },
    {
      username: 'adrian-tudev',
      name: 'Adrian Tudev',
      role: 'Backend',
      avatar: ''
    },
  ]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const updatedContributors = await Promise.all(
        contributors.map(async (contributor) => {
          try {
            const response = await fetch(`https://api.github.com/users/${contributor.username}`);
            if (response.ok) {
              const data = await response.json();
              return { ...contributor, avatar: data.avatar_url };
            }
            return contributor;
          } catch (error) {
            console.error(`Error fetching avatar for ${contributor.username}:`, error);
            return contributor;
          }
        })
      );
      setContributors(updatedContributors);
    };
    fetchAvatars();
  }, [contributors]);

  return (
    <div className="container page-content">
      <h1>Om oss</h1>
      <section className="about-section">
        <h2>Vår verksamhet</h2>
        <p>
          Campus Books är en ideell marknadsplats skapad av och för studenter på Chalmers tekniska högskola.
          Vi erbjuder en plattform där studenter enkelt kan köpa och sälja begagnad kurslitteratur.
        </p>
        <p>
          Vårt mål är att göra kurslitteratur mer tillgänglig och prisvärd för alla studenter på campus,
          samtidigt som vi främjar hållbarhet genom återanvändning av böcker.
        </p>
      </section>

      <section className="about-section">
        <h2>Vår vision</h2>
        <p>
          Vi vill skapa ett enkelt och tryggt sätt för Chalmersstudenter att hitta rätt kurslitteratur
          till ett rimligt pris, direkt från andra studenter som redan läst kurserna.
        </p>
      </section>

      <section className="about-section contributors-section">
        <h2>Kontributörer</h2>
        
        <div className="contributors-grid">
          {contributors.map((contributor, index) => (
            <div className="contributor-card" key={index}>
              <div className="avatar-container">
                <img 
                  src={contributor.avatar || `https://github.com/identicon/${contributor.username}.png`} 
                  alt={`${contributor.name} GitHub Avatar`} 
                  className="avatar" 
                />
              </div>
              <h3>{contributor.name}</h3>
              <p>{contributor.role}</p>
              <a href={`https://github.com/${contributor.username}`} target="_blank" rel="noopener noreferrer" className="github-link">
                <FaGithub className="github-icon" /> GitHub
              </a>
            </div>
          ))}
        </div>
        
      </section>
    </div>
  );
};

export default AboutPage;