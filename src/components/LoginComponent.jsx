import { useState } from 'react';
import { Stack, Box, Container, Button, TextField } from "@mui/material";
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginComponent = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = () => {
    auth.login(username, password);
  };

  return (
    <Container 
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      
      <Box sx={{ width: 300}}>
        <Stack spacing={2}>
          <h1>Вход</h1>
          <TextField label="Логин" value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Пароль" value={password} variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Войти</Button>
          <Link to="/forgot_password">Забыл пароль</Link>
        </Stack>
      </Box>
    </Container>  
  );
};

export default LoginComponent;
