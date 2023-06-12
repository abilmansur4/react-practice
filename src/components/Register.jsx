import { useState } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useAuth } from "../hook/useAuth";
// import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ruleAccept, setRuleAccept] = useState(false);

  axios.defaults.withCredentials = true;

  const auth = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

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
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      <Box sx={{ width: 350, padding: 6, "bordeRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
        <Stack spacing={2}>
          <Typography variant="h5">Зарегистрироваться</Typography>
          <TextField className="txtField" label="Логин" value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
          <TextField className="txtField" label="Пароль" value={password} variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <TextField className="txtField" label="Почта" value={email} variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <TextField className="txtField" label="Телефон" value={phone} variant="outlined" type="text" onChange={(e) => setPhone(e.target.value)}/>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} size="small"/>} label="С правилами ознакомлен" />
          </FormGroup>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Зарегистрироваться</Button>
        </Stack>
      </Box>
    </Container>  
  );
};

export default Register;
