import axios from 'axios';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
    try {
        // URL do site que você quer raspar
        const url = "https://www.tipminer.com/historico/betfair/aviator";
        
        // Faz uma requisição GET ao site
        const response = await axios.get(url);
        
        // Carrega o HTML na JSDOM
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Coleta resultados e datas
        const resultElements = document.querySelectorAll('.cell__result');
        const dateElements = document.querySelectorAll('.cell__date');

        const results = Array.from(resultElements).map(el => el.textContent.trim());
        const dates = Array.from(dateElements).map(el => el.textContent.trim());

        // Combina resultados e datas
        const combined = results.map((result, index) => ({
            result,
            date: dates[index]
        }));

        // Retorna os resultados como JSON
        res.status(200).json(combined);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar a requisição." });
    }
}
