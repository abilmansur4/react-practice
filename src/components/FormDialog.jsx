// import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton  from '@mui/material/IconButton';

const FormDialog = ({
  openFormDialog, closeFormDialog, handleChange, formDialogTitle,
  username, setUsername, 
  email, setEmail,
  firstname, setFirstname,
  lastname, setLastname,
  secondname, setSecondname,
  phone, setPhone,
  iin, setIin,
  nameOrganization, setNameOrganization,
  password, setPassword,
  showPassword, setShowPassword,
  handleClickShowPassword, handleMouseDownPassword
}) => {

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });

  const update = async (user) => {
    await axios.put("http://localhost:5000/api/users/" + localStorage.userId, user)
      .then((response) => {
        if (response.status === 200) {
          // setSuccessOpen(true);
          console.log("uspeshno")
        };
      }
    )
  }

  return (
    <div>
      <Dialog open={openFormDialog} onClose={closeFormDialog}>
        <DialogTitle>{formDialogTitle}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 400, padding: 2 }}>
          <Stack spacing={2}>
            <TextField className="txtField" label="Логин" value={username} variant="standard" type="text" size="small" onChange={(e) => setUsername(e.target.value)}/>
            <TextField className="txtField" label="Имя" value={firstname || ''} variant="standard" type="text" onChange={(e) => setFirstname(e.target.value)}/>
            <TextField className="txtField" label="Фамилия" value={lastname || ''} variant="standard" type="text" onChange={(e) => setLastname(e.target.value)}/>
            <TextField className="txtField" id="standard-helperText1" helperText="*Необязательно" label="Отчество" value={secondname || ''} variant="standard" type="text" onChange={(e) => setSecondname(e.target.value)}/>
            <TextField className="txtField" label="Почта" value={email} variant="standard" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <TextField className="txtField" label="Телефон" value={phone || ''} variant="standard" type="text" onChange={(e) => setPhone(e.target.value)}/>
            <TextField className="txtField" label="ИИН" value={iin || ''} variant="standard" type="text" onChange={(e) => setIin(e.target.value)}/>
            <TextField className="txtField" id="standard-helperText2" helperText="*Необязательно" label="Название организации" value={nameOrganization || ''} variant="standard" type="text" onChange={(e) => setNameOrganization(e.target.value)}/>
            {/* <TextField className="txtField" label="Пароль" value={password || ''} variant="standard" type="password" onChange={(e) => setPassword(e.target.value)}/> */}
            <TextField
            label='Пароль'
            variant="standard"
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              autoComplete: 'new-password'
            }}
          />
            {/* <Button type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button> */}
            {/* <SnackbarComponent open={successOpen} onClose={handleCloseSuccess} severity="success" message="Данные успешно сохранены!"  />
            <SnackbarComponent key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleCloseError} severity="error" message="Ошибка!"  /> */}
          </Stack>
        </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button variant="contained" onClick={handleChange}>Сохранить</Button>
          <Button onClick={closeFormDialog}>Отменить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;