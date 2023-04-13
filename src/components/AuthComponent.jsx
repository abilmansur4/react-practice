import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import axios from "axios";
// import jwt from "jsonwebtoken";

import Home from "./Home";
import LoginComponent from "./LoginComponent";

const AuthComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password);
    
    // try {
    //   const response = await axios.post("", {
    //     username: username,
    //     password: password,
    //   });

    //   const token = response.data.token;
    //   setToken(token);

    //   localStorage.setItem("token", token);

    //   const decodedToken = jwt.decode(token);

    //   console.log(decodedToken);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            {token ? (
              <li>
                <button onClick={handleLogout}>Выйти</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Войти</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={
            <LoginComponent
              username={username}
              password={password}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleSubmit={handleSubmit}
            />
          }>
            
          </Route>
          <Route path="/" element={
            <Home />
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default AuthComponent;
