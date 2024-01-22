// TrendingList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Trends.css';

const Trends = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [filteredTrendingList, setFilteredTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        setTrendingList(response.data.coins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter trendingList based on the search query
    const filteredList = trendingList.filter(
      (trendingCoin) =>
        trendingCoin.item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trendingCoin.item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTrendingList(filteredList);
  }, [searchQuery, trendingList]);

  return (
    <div className="trending-list-container">
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
        <ul className="trending-list">
          {filteredTrendingList.map((trendingCoin) => (
            <li key={trendingCoin.item.id} className="trending-item">
              <img src={trendingCoin.item.large} alt={trendingCoin.item.name} className="trending-image" />
              <div className="trending-details">
                <span className="trending-name">{trendingCoin.item.name}</span>
                <span className="trending-symbol">{trendingCoin.item.symbol}</span>
              </div>
              <div className="trending-price-container">
                <span className="trending-price">{trendingCoin.item.data.price}</span>
                <span className="trending-rank">Rank: {trendingCoin.item.market_cap_rank}</span>
                <Link to={`/${trendingCoin.item.id}`} className="view-chart-btn">View Chart</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trends;
