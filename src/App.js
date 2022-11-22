import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

// Hooks
import { useState, useEffect } from 'react';

// Components
import { Home } from './components/Home';
import { ComparePrices } from './components/ComparePrices';
import { PriceTable } from './components/PriceTable';
import { Chart } from './components/Chart';

function App() {
  const [coin, setCoin] = useState(null);
  const [date, setDate] = useState('');

  return (
    <div className="App">
      <h1 className="app-heading">CRYPTO TRACKER</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/compare" element={<ComparePrices />} />
          <Route path="/price-table" element={<PriceTable />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
