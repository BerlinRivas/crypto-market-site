import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './CryptoChart.css'; 

const CryptoChart = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        if (!id) {
          console.error('Crypto ID is undefined');
          return;
        }

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`);
        setChartData(response.data.prices.map(([time, price]) => ({ time, price })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    const fetchCryptoDetails = async () => {
      try {
        if (!id) {
          console.error('Crypto ID is undefined');
          return;
        }

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
        setCryptoDetails({
          name: 'N/A',
          symbol: 'N/A',
          image: 'fallback-image-url', // Replace with a fallback image URL
          current_price: 'N/A',
          market_cap: 'N/A',
          market_cap_rank: 'N/A',
          high_24h: 'N/A',
          low_24h: 'N/A',
        });
      }
    };

    fetchChartData();
    fetchCryptoDetails();
  }, [id]);

  const formatDateTick = (timestamp) => {
    return moment(timestamp).format('MM/DD/YYYY');
  };

  return (
    <div className="crypto-chart-container">
      <div className="crypto-details">
        {/* <img src={cryptoDetails.image} alt={cryptoDetails.name} /> */}
        <h2>Price History Chart for {cryptoDetails.name} ({cryptoDetails.symbol})</h2>
        {/* <p>Current Price: {cryptoDetails.current_price}</p>
        <p>Market Cap: {cryptoDetails.market_cap}</p> */}
        <p>Market Cap Rank: {cryptoDetails.market_cap_rank}</p>
        {/* <p>High 24h: {cryptoDetails.high_24h}</p>
        <p>Low 24h: {cryptoDetails.low_24h}</p> */}
      </div>
      {loading ? (
        <p>Loading chart data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={formatDateTick} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CryptoChart;
