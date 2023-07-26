import { useState } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import SnackbarComponent from './SnackbarComponent';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ruleAccept, setRuleAccept] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const auth = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  // Уведомления
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setRuleAccept(event.target.checked);
    // console.log(ruleAccept);
  }

  const handleSubmit = () => {
    // auth.login(username, password);
    // try{
    //   const response = await auth.register(username, password, email, phone, ruleAccept);
    //   if(response.status === 200){
    //     setMessage("Вы успешно прошли регистрацию!");
    //     setSeverity("success");
    //     setOpen(true);
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   } else if (response.status === 400) {
    //     console.log(response.data.message);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    auth.register(username, password, email, phone);
    
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
          {/* <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} size="small"/>} label="С правилами ознакомлен" />
          </FormGroup> */}
          <Button type="submit" variant="contained" onClick={handleSubmit}>Зарегистрироваться</Button>
          {/* <SnackbarComponent 
            open={open} 
            onClose={handleCloseSuccess} 
            severity={severity} 
            message={message} 
          /> */}
        </Stack>
      </Box>
    </Container>  
  );
};

export default Register;
