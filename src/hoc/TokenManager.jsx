import { useState, useEffect } from 'react';
import axios from 'axios';

const TokenManager = () => {
  const updateToken = () => {
    axios.get("http://localhost:5000/api/auth/refresh")
      .then((response) => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      })
  };

  useEffect(() => {
    updateToken();
    // Установите интервал обновления токена в соответствии с вашими требованиями
    const interval = setInterval(updateToken, 1500000); // Обновление токена

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

};

export default TokenManager;
