import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [stockCode, setStockCode] = useState(''); // Hisse kodu durumu
  const [stockPrice, setStockPrice] = useState(null); // Mevcut fiyat durumu
  const [highPrice, setHighPrice] = useState(null); // Gün içi en yüksek fiyat durumu
  const [lowPrice, setLowPrice] = useState(null); // Gün içi en düşük fiyat durumu
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı durumu

  const fetchStockPrice = async () => {
    try {
      // API'den hisse fiyatını al
      const response = await axios.get(`http://localhost:8080/api/stocks/${stockCode}`);
      console.log("API Response:", response.data); // API yanıtını logla

      // Hata mesajı kontrolü
      if (response.data.error) {
        setErrorMessage(response.data.error); // Hata mesajını ayarla
        setStockPrice(null); // Fiyatı sıfırla
        setHighPrice(null); // En yüksek fiyatı sıfırla
        setLowPrice(null); // En düşük fiyatı sıfırla
        return; // İşlemi sonlandır
      }

      // Geçerli fiyatı, en yüksek ve en düşük fiyatı ayarla
      setStockPrice(response.data.c); // Mevcut fiyatı ayarla
      setHighPrice(response.data.h);  // Gün içi en yüksek fiyatı ayarla
      setLowPrice(response.data.l);   // Gün içi en düşük fiyatı ayarla
      setErrorMessage(null); // Hata mesajını sıfırla
    } catch (error) {
      console.error("Error fetching stock data:", error); // Hataları logla
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin."); // Genel hata mesajı
      setStockPrice(null); // Fiyatı sıfırla
      setHighPrice(null);  // En yüksek fiyatı sıfırla
      setLowPrice(null);   // En düşük fiyatı sıfırla
    }
  };

  return (
    <div>
      <h1>Hisse Senedi Fiyatı Sorgulama</h1>
      <input
        type="text"
        placeholder="Hisse kodunu girin (örneğin, TSLA)"
        value={stockCode}
        onChange={(e) => setStockCode(e.target.value)}
      />
      <button onClick={fetchStockPrice}>Hisse Fiyatını Al</button>
      
      {/* Mevcut fiyat, gün içi en yüksek ve en düşük fiyatları göster */}
      {stockPrice && <p>Mevcut Fiyat: {stockPrice} dolar</p>}
      {highPrice && <p>Gün İçindeki En Yüksek Fiyat: {highPrice} dolar</p>}
      {lowPrice && <p>Gün İçindeki En Düşük Fiyat: {lowPrice} dolar</p>}
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Hata mesajını göster */}
    </div>
  );
}

export default App;
