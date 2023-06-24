import { useState, useEffect } from 'react';
import axios from 'axios';

const TokenManager = () => {
  const updateToken = () => {
    axios.get("http://localhost:5000/api/auth/refresh")
      .then((response) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      })
  };

  useEffect(() => {
    updateToken();
    // Установите интервал обновления токена в соответствии с вашими требованиями
    const interval = setInterval(updateToken, 1800000); // Обновление токена каждый час

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

};

export default TokenManager;
