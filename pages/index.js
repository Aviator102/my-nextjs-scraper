import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/scrape');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Resultados do Scraping</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <strong>Resultado:</strong> {item.result} | <strong>Data:</strong> {item.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}
