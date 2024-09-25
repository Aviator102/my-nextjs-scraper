import { NextApiRequest, NextApiResponse } from 'next';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

export default async function handler(req, res) {
  // Configurar o ChromeDriver com opções headless
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navegar para a URL e realizar o scraping
    await driver.get('https://www.tipminer.com/historico/betfair/aviator');
    const results = await driver.wait(until.elementLocated(By.className('cell__result')), 10000);
    const text = await results.getText();
    
    // Retornar o resultado como resposta JSON
    res.status(200).json({ result: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping failed' });
  } finally {
    await driver.quit();
  }
}
