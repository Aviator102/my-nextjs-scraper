// pages/api/scrape.js

import requests from 'axios';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  try {
    // Lógica de scraping aqui (substitua pela sua lógica)
    const { data } = await requests.get('https://www.tipminer.com/historico/betfair/aviator');
    
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Exemplo de como coletar dados
    const results = [...document.querySelectorAll('.cell__result')].map(el => el.textContent);
    
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
}
