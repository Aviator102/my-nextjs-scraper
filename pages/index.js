// pages/index.js

import React from 'react';

const Home = () => {
  const handleFetchResults = async () => {
    const response = await fetch('/api/scrape');
    const data = await response.json();
    console.log(data); // Você pode fazer algo com os dados aqui
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My Next.js Scraper</h1>
      <button onClick={handleFetchResults} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Buscar Resultados
      </button>
      <button onClick={() => window.open('https://scrapingaviator.vercel.app/api/scrape', '_blank')} style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>
        Acessar API
      </button>
      {/* Aqui você pode adicionar uma seção para exibir os resultados */}
    </div>
  );
};

export default Home;
