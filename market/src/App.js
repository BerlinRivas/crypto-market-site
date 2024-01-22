import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Market from './components/Market'
import Trends from './components/Trends'
import Contact from './components/Contact'
import CryptoChart from './components/CryptoChart'
import {Route, Routes} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/market" element={<Market/>}/>
          <Route path="/trends" element={<Trends/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/:id" element={<CryptoChart />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;