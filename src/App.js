import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

// Create a new Coin component
const Coin = ({ name, image, symbol, marketcap, price, pricechange }) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt={name} />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">₹{price.toLocaleString()}</p>
          <p className="coin-volume">₹{marketcap.toLocaleString()}</p>
          {pricechange < 0 ? (
            <p className="coin-percent red">{pricechange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{pricechange.toFixed(2)}%</p>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <form action="">
          <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange} />
        </form>
      </div>
      <div className="coin-table-container">
        <table className="coin-table">
          <thead>
            <tr className="coin-row">
              <th className="coin-cell">Name</th>
              <th className="coin-cell">Price</th>
              <th className="coin-cell">Market Cap</th>
              <th className="coin-cell">Price Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map(coin => (
              <tr className="coin-row" key={coin.id}>
                <td className="coin-cell">
                  <div className="coin-name">
                    <img src={coin.image} alt={coin.name} />
                    {coin.name}
                  </div>
                  <div className="coin-symbol">{coin.symbol}</div>
                </td>
                <td className="coin-cell">₹{coin.current_price.toLocaleString()}</td>
                <td className="coin-cell">₹{coin.market_cap.toLocaleString()}</td>
                <td className={`coin-cell coin-percent ${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
}

export default App;