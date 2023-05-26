import axios from "axios";
import { useState, useEffect } from 'react';
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

import SnackbarComponent from './SnackbarComponent'

const EditCabinet = () => {

  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [iin, setIin] = useState('');
  const [nameOrganization ,setNameOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [open, setOpen] = useState(false);

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/user=" + localStorage.getItem("userId"), config)
      .then((response) => {
        // console.log(response.data);
        setUsername(response.data.username);
        setFirstname(response.data.firstName);
        setLastname(response.data.lastName);
        setSecondname(response.data.secondName);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setIin(response.data.iin);
        setNameOrganization(response.data.nameOrganization);
        
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //   }
      // })
  }, []);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const update = async (user) => {
    await axios.put("http://localhost:5000/api/users/" + localStorage.userId, user, config)
      .then((response) => {
        if (response.status === 200) {
          setOpen(true);
          setTimeout(() => {
            navigate("/cabinet")
          }, 1500);
        };
      })
    
  }


  const handleSubmit = () => {
    const tmp = [username, firstname, lastname, secondname, email, phone, iin, nameOrganization, password];
    const user = {};
    if (username !== '') {
      user.username = username;
    } if (firstname !== '') {
      user.firstName = firstname;
    } if (lastname !== '') {
      user.lastName = lastname;
    } if (secondname !== '') {
      user.secondName = secondname;
    } if (email !== '') {
      user.email = email;
    } if (phone !== '') {
      user.phone = phone;
    } if (iin !== '') {
      user.iin = iin;
    } if (nameOrganization !== '') {
      user.nameOrganization = nameOrganization;
    } 

    if (password !== passwordCheck) {
      alert("Пароли не совпадают")
    } else if(password === passwordCheck) {
      if (password !== '') {
        user.password = password
      }
    }
    
    update(user);
  };

  return (
    <Box sx={{ width: 500, padding: 6, "borderRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.09)"}}>
      <Stack spacing={2}>
          <Typography variant="h5">Редактировать профиль</Typography>
          <TextField className="txtField" label="Логин" value={username || ''} variant="standard" type="text" size="small" onChange={(e) => setUsername(e.target.value)}/>
          <TextField className="txtField" label="Имя" value={firstname || ''} variant="standard" type="text" onChange={(e) => setFirstname(e.target.value)}/>
          <TextField className="txtField" label="Фамилия" value={lastname || ''} variant="standard" type="text" onChange={(e) => setLastname(e.target.value)}/>
          <TextField className="txtField" id="standard-helperText1" helperText="*Необязательно" label="Отчество" value={secondname || ''} variant="standard" type="text" onChange={(e) => setSecondname(e.target.value)}/>
          <TextField className="txtField" label="Почта" value={email || ''} variant="standard" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <TextField className="txtField" label="Телефон" value={phone || ''} variant="standard" type="text" onChange={(e) => setPhone(e.target.value)}/>
          <TextField className="txtField" label="ИИН" value={iin || ''} variant="standard" type="text" onChange={(e) => setIin(e.target.value)}/>
          <TextField className="txtField" id="standard-helperText2" helperText="*Необязательно" label="Название организации" value={nameOrganization || ''} variant="standard" type="text" onChange={(e) => setNameOrganization(e.target.value)}/>
          <Typography variant="subtitle1">Изменить пароль</Typography>
          <TextField className="txtField" label="Пароль" value={password} variant="standard" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <TextField className="txtField" label="Повторите пароль" value={passwordCheck} variant="standard" type="password" onChange={(e) => setPasswordCheck(e.target.value)}/>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button>
          <SnackbarComponent open={open} onClose={handleClose} severity="success" message="Данные успешно сохранены!"  />
        </Stack>
    </Box>
  )
};

export default EditCabinet;