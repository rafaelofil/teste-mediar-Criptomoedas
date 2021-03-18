import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ChartCurrency.module.css';
import { Bar } from 'react-chartjs-2';

function ChartCurrency() {
  const [coins, setCoins] = useState(null);
  const [countryCurrency, setCountryCurrency] = useState('BRL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCurrency(url) {
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

  useEffect(() => {
    fetchCurrency(
      `https://api.exchangeratesapi.io/latest?base=${countryCurrency}`,
    );
  }, [countryCurrency]);

  let countrySymbol;
  let countryPrice;
  if (coins !== null) {
    countrySymbol = Object.keys(coins.rates).filter((symbol) => {
      if (symbol === 'IDR' || symbol === 'HUF' || symbol === 'KRW') {
        return false;
      }
      return true;
    });
    countryPrice = Object.keys(coins.rates)
      .filter((symbol) => {
        if (symbol === 'IDR' || symbol === 'HUF' || symbol === 'KRW') {
          return false;
        }
        return true;
      })
      .map((symbol) => coins.rates[symbol]);
  }

  let chartCountryCurrency = {
    labels: countrySymbol,
    datasets: [
      {
        label: 'Valor',
        data: countryPrice,
        backgroundColor: 'rgba(239, 81, 69, 0.6)',
        color: 'rgba(255,255,255, 0.6)',
        fontColor: 'rgba(255,255,255,0.6)',
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
    <div className={styles.container}>
      <div>
        <h1>Moedas</h1>
        <form>
          <select
            name="countryCurrency"
            id="contryCurrency"
            value={countryCurrency}
            onChange={({ target }) => setCountryCurrency(target.value)}
          >
            {countrySymbol.map((countryCurrency) => (
              <option key={countryCurrency} value={countryCurrency}>
                {countryCurrency}
              </option>
            ))}
          </select>
        </form>
        <div className={styles.chart}>
          <Bar data={chartCountryCurrency} />
        </div>
      </div>
    </div>
  );
}

export default ChartCurrency;
