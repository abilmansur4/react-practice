import React from "react";
import { Stack, Box, Container, Button, TextField } from "@mui/material";

const LoginComponent = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <Container 
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      
      <Box sx={{ width: 300}}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Логин" value={username} variant="outlined" onChange={handleUsernameChange}/>
            <TextField label="Пароль" value={password} variant="outlined" type="password" onChange={handlePasswordChange}/>
            <Button type="submit" variant="contained">Войти</Button>
          </Stack>
        </form>
      </Box>
      
    </Container>  
  );
};

export default LoginComponent;
