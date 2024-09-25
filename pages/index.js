// pages/index.js
import { useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/scrape');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Scraper de Resultados</h1>
            <button onClick={fetchData}>Buscar Resultados</button>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>R: {item.result}, Data: {item.date}</li>
                ))}
            </ul>
        </div>
    );
}
