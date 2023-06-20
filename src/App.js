import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Define state variables for price and loading status
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the current price of Solana
  const fetchPrice = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
      );
      const data = await response.json();
      setPrice(data.solana.usd);
      setLoading(false); // Set loading to false after the data is fetched
    } catch (error) {
      console.error('Failed to fetch price:', error);
    }
  };

  // Use useEffect to call the fetchPrice function when the app starts and every 10 seconds
  useEffect(() => {
    fetchPrice();
    console.log("fetching price");
    const interval = setInterval(() => {
       fetchPrice();
    }, 10000); // 10 seconds

    // Clear the interval when the component is destroyed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <img src="https://thedogecapital.com/controls/dawg.svg" className='responsive-img'  alt="dawg-logo" />
            <img src="https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogotype.e4df684f.svg&w=256&q=75" className='responsive-img' alt="solana-logo" />
            <p>The current price of Solana is ${price}</p>
          </div>
         
        )}
      </header>
    </div>
  );
}

export default App;
