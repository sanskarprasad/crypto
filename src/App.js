// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';                            // ✅ import useDispatch
import { simulatePriceUpdate } from './features/crypto/cryptoSlice'; // ✅ import your action
import CryptoTable from './components/CryptoTable';                   // ✅ import the table component

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(simulatePriceUpdate());
    }, 1500);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
