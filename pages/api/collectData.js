// pages/api/collectData.js

import axios from 'axios';
import cheerio from 'cheerio';

const getCurrentTime = async () => {
    const response = await axios.get("https://brasilapi.vercel.app/api/hora");
    return response.data.hora; // Retorna a hora no formato HH:MM:SS
};

const collectData = async () => {
    const currentTime = await getCurrentTime();
    if (!currentTime) {
        throw new Error("Não foi possível obter a hora da API.");
    }

    const currentHour = currentTime; // Aqui você pode processar a hora se precisar

    const url = "https://www.tipminer.com/historico/betfair/aviator";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];
    const checkResults = new Set(); // Para manter controle dos resultados já coletados

    $('.cell__result').each((index, element) => {
        const result = $(element).text().trim();
        const date = $('.cell__date').eq(index).text().trim();

        if (result && date) {
            results.push({ result, date });
        }
    });

    // Processar os resultados
    const newResults = results.filter(({ date }) => {
        const latestDateTime = date; // Você pode precisar converter para um formato de hora
        return latestDateTime >= currentHour && !checkResults.has(result);
    });

    // Adiciona resultados novos ao conjunto
    newResults.forEach(({ result, date }) => {
        checkResults.add(result);
        console.log(`R: ${result}, Data: ${date}`); // Exibe os novos resultados
    });

    return newResults; // Retorna os novos resultados coletados
};

export default async function handler(req, res) {
    try {
        const data = await collectData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
