import { useState } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const RegisterComponent = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ruleAccept, setRuleAccept] = useState(false);

  axios.defaults.withCredentials = true;

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleCheckboxChange = (event) => {
    setRuleAccept(event.target.checked);
    // console.log(ruleAccept);
  }

  const handleSubmit = () => {
    // auth.login(username, password);
    auth.register(username, password, email, phone, ruleAccept);
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
          <h1>Зарегистрироваться</h1>
          <TextField label="Логин" value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Пароль" value={password} variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <TextField label="Почта" value={email} variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <TextField label="Телефон" value={phone} variant="outlined" type="text" onChange={(e) => setPhone(e.target.value)}/>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} size="small"/>} label="С правилами ознакомлен" />
          </FormGroup>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Зарегистрироваться</Button>
        </Stack>
      </Box>
    </Container>  
  );
};

export default RegisterComponent;
