// CryptoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Market.css';

const Market = ({ setFilteredCryptoList }) => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredCryptoList, setFilteredCryptoListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        );
        setCryptoList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter cryptoList based on the search query
    const filteredList = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCryptoListState(filteredList);
    if (setFilteredCryptoList) {
      setFilteredCryptoList(filteredList);
    }
  }, [searchQuery, cryptoList, setFilteredCryptoList]);

  return (
    <div className="crypto-list-container">
      <div className='home-search-input'>
        <input
          placeholder='Search for a coin'
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg> */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="crypto-list">
          {filteredCryptoList.map((crypto) => (
            <li key={crypto.id} className="crypto-item">
              <img src={crypto.image} alt={crypto.name} width="20" height="20" className="crypto-image" />
              <div className="crypto-details">
                <span className="crypto-name">{crypto.name}</span>
                <span className="crypto-symbol">{crypto.symbol}</span>
              </div>
              <div className="crypto-price-container">
                <span className="crypto-price">${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="crypto-rank">Rank: {crypto.market_cap_rank}</span>
                <Link to={`/${crypto.id}`} className="view-chart-btn">View Chart</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Market;
