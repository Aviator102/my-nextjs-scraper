// pages/api/scrape.js
import axios from 'axios';
import cheerio from 'cheerio';

// Função para obter a hora atual da API
const getCurrentTime = async () => {
    try {
        const response = await axios.get("https://brasilapi.vercel.app/api/hora");
        return response.data.hora; // Retorna a hora no formato HH:MM:SS
    } catch (error) {
        console.error("Erro ao obter a hora:", error);
        return null;
    }
};

export default async function handler(req, res) {
    const currentTime = await getCurrentTime();
    if (!currentTime) {
        return res.status(500).json({ message: "Não foi possível obter a hora da API." });
    }

    const currentHour = currentTime.split(':').slice(0, 2).join(':'); // Obtém a hora sem os segundos

    try {
        const url = "https://www.tipminer.com/historico/betfair/aviator";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const checkResults = new Set(); // Para manter controle dos resultados já coletados
        const results = [];
        
        // Coleta resultados
        $('.cell__result').each((i, element) => {
            const result = $(element).text().trim();
            const date = $('.cell__date').eq(i).text().trim(); // Obter a data correspondente

            if (date) {
                const latestDateTime = date.split(':').slice(0, 2).join(':'); // Obtém a hora sem os segundos

                // Verifica se o horário da última data é maior ou igual à hora atual da API
                if (latestDateTime >= currentHour && !checkResults.has(result)) {
                    checkResults.add(result); // Adiciona o resultado ao conjunto
                    results.push({ result, date }); // Armazena o resultado e a data
                }
            }
        });

        // Retorna os resultados encontrados
        return res.status(200).json(results);
    } catch (error) {
        console.error("Erro ao realizar scraping:", error);
        return res.status(500).json({ message: "Erro ao processar a requisição." });
    }
}
