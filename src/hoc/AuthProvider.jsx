import { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import SnackbarComponent from '../components/SnackbarComponent'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   axios.get("http://localhost:3001/login").then((response) => {
  //     // console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setUser(response.data.user[0].username);
  //       // navigate("/", { replace: true });
  //       // auth.login(username);
  //       // console.log(response);
  //     }
  //   });
  // });

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem("accessToken")
    }
  }

  const login = (user, password) => {
    axios
      .post("http://localhost:5000/api/auth", {
        username: user,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          setAccessToken(localStorage.getItem("accessToken"));
          setRefreshToken(localStorage.getItem("refreshToken"));
          navigate("/cabinet", { replace: true });
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const logout = () => {
    axios.post("http://localhost:5000/api/auth/logout", config)
      .then((response) => {
      // console.log(response);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setRefreshToken(null);
      navigate("/login", { replace: true });
      
    });
    // cb();
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // setAccessToken(null);
    // setRefreshToken(null);
  };

  const register = (username, password, email, phone, ruleAccept) => {
    axios.post("http://localhost:5000/api/auth/registration", {
      username: username,
      password: password,
      email: email,
      phone: phone,
      positionId: 1,
      roleId: [2],
      ruleAccept: ruleAccept
    })
    .then((response) => { 
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setAccessToken(localStorage.getItem("accessToken"));
        setRefreshToken(localStorage.getItem("refreshToken"));
        navigate("/", { replace: true });
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  }

  const value = { accessToken, refreshToken, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
