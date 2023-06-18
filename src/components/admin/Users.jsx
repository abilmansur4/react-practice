import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';
import IconButton  from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormDialog from '../FormDialog';
import SnackbarComponent from '../SnackbarComponent';

const Users = () => {

  axios.defaults.withCredentials = true;

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [phone, setPhone] = useState('');
  const [iin, setIin] = useState('');
  const [nameOrganization ,setNameOrganization] = useState('');
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [users, setUsers] = useState([]);
  
  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  const navigate = useNavigate();

  // Получение всех пользователей
  const getUsers = () => {
    axios.get("http://localhost:5000/api/users", config)
    .then((response) => {
      // console.log(response);
      setUsers(response.data);
    })
    .catch((error) => {
    });
    
  }

  // Удаление пользователя
  const deleteUser = (id) => {
    axios.delete("http://localhost:5000/api/users/" + id, config)
    .then((response) => {
      // console.log(response);
    })
  }

  const handleClickOpen = (user) => {
    setUser(user);
    setopenDeleteDialog(true);
  };

  const handleClose = () => {
    setopenDeleteDialog(false);
  };

  const handleDeleteUser = () => {
    const updatedData = users.filter(item => item.id !== id);
    setUsers(updatedData);
    deleteUser(user.id);
    handleClose();
    setMessage("Пользователь успешно удален!");
    setSeverity("success");
    setOpen(true);
    // setTimeout(() => {
    //   navigate(0);
    // }, 2000);
    getUsers();
  }

  // Редактирование пользователя
  const handleClickOpenFormDialog = (user) => {
    setId(user.id);
    setUsername(user.username);
    setFirstname(user.firstName);
    setLastname(user.lastName);
    setSecondname(user.secondName);
    setPhone(user.phone);
    setEmail(user.email);
    setIin(user.iin);
    setNameOrganization(user.nameOrganization);
    setOpenFormDialog(true);
  }

  const handleChange = (event) => {
    const user = {
      // 'username': username,
      // 'firstName': firstname,
      // 'lastName': lastname,
      // 'secondName': secondname,
      // 'email': email,
      // 'phone': phone,
      // 'iin': iin,
      // 'nameOrganization': nameOrganization
    }

    user.username = username;
    user.firstName = firstname;
    user.lastName = lastname;
    user.secondName = secondname;
    user.email = email;
    user.phone = phone;
    user.iin = iin;
    user.nameOrganization = nameOrganization;

    const updatedUser = users.map(item => {
      if (item.id === id) {
        return { ...item, ...user};
      }
      return item;
    });

    setUsers(updatedUser);

    update(user);

    
  };

  const update = async (user) => {
    await axios.put("http://localhost:5000/api/users/" + id, user, config)
      .then((response) => {
        if (response.status === 200) {
          closeFormDialog();
          setMessage("Пользователь успешно отредактирован!");
          setSeverity("success");
          setOpen(true);
          // setTimeout(() => {
          //   navigate(0);
          // }, 2000);
        };
      })
  }

  const closeFormDialog = () => {
    setOpenFormDialog(false);
    setUsername('');
    setFirstname('');
    setLastname('');
    setSecondname('');
    setEmail('');
    setPhone('');
    setIin('');
    setNameOrganization('');
  }

  // Уведомления
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TableContainer component={Paper} sx={{width: 750}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Действия</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Tooltip title="Редактировать">
                    <IconButton onClick={() => handleClickOpenFormDialog(user)}>
                      <EditIcon sx={{ width: 14, height: 14 }} />
                    </IconButton>
                  </Tooltip>
                  { user.id === 1 ? 
                  (<Box />) : 
                  (<Tooltip title="Удалить">
                  <IconButton onClick={() => handleClickOpen(user)}>
                    <HighlightOffIcon sx={{ width: 14, height: 14 }} />
                  </IconButton>
                </Tooltip>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Dialog
          open={openDeleteDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы действительно хотите удалить пользователя {user.username} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteUser}>
              Да
            </Button>
            <Button onClick={handleClose} autoFocus>
              Нет
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <FormDialog 
        openFormDialog={openFormDialog} 
        closeFormDialog={closeFormDialog} 
        handleChange={handleChange}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        secondname={secondname}
        setSecondname={setSecondname}
        phone={phone}
        setPhone={setPhone}
        iin={iin}
        setIin={setIin}
        nameOrganization={nameOrganization}
        setNameOrganization={setNameOrganization}
        
      />
      <SnackbarComponent 
        open={open} 
        onClose={handleCloseSuccess} 
        severity={severity} 
        message={message} 
      />
    </Box>
  )
};

export default Users;