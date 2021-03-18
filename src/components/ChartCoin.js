import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ChartCoin.module.css';
import { Line } from 'react-chartjs-2';

function ChartCoin() {
  const [coins, setCoins] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCoins(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setCoins(json);
    } catch (error) {
      setError('Um erro ocorreu, tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCurrency(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setCurrency(json);
    } catch (erro) {
      setError('Um erro ocorreu.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins('https://api.coinlore.net/api/tickers/?start=100&limit=10');
    fetchCurrency('https://api.exchangeratesapi.io/latest?base=USD');
  }, []);

  let symbol;
  let price;
  const [currencyCurrent, setCurrencyCurrent] = useState('BRL');

  if (coins !== null) {
    symbol = coins.data.map((element) => {
      return element.symbol;
    });
    price = coins.data.map((element) => {
      return element.price_usd * currency.rates[currencyCurrent];
    });
  }

  let chartCoinData = {
    labels: symbol,
    datasets: [
      {
        label: currencyCurrent,
        data: price,
        borderColor: '#0079ac',
        pointBackgroundColor: '#ef5145',
      },
    ],
  };

  if (loading) return <div className={styles.loading}></div>;
  if (error)
    return (
      <div className={styles.error}>
        <h1>{error}</h1>
      </div>
    );
  return (
    <div className={styles.container} id="chart">
      <div>
        <h1>Criptomoedas</h1>
        <form>
          <select
            name="currency"
            id="currency"
            value={currencyCurrent}
            onChange={({ target }) => setCurrencyCurrent(target.value)}
          >
            {Object.keys(currency.rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </form>
        <div className={styles.chart}>
          <Line data={chartCoinData} />
        </div>
      </div>
    </div>
  );
}

export default ChartCoin;
