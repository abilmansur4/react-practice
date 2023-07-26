import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SearchUsers from './SearchUsers';
import SnackbarComponent from '../SnackbarComponent';
import FormDialog from '../FormDialog';

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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formDialogTitle, setFormDialogTitle] = useState('');
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Количество элементов на странице
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  

  const [searchResults, setSearchResults] = useState([]);

  const currentItems = searchResults.slice(firstIndex, lastIndex); 

  const [userForSearch, setUserForSearch] = useState('');
  
  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  const navigate = useNavigate();

  // Переключение страниц
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Создание пользователя
  const createUser = () => {
    setIsEditingUser(false);
    setFormDialogTitle("Создать пользователя");
    setOpenFormDialog(true);
  }

  const create = (user) => {
    const usr = {...user, positionId: '1', roles: [1]};
    axios.post("http://localhost:5000/api/users/create", usr, config)
      .then((response) => {
        console.log(response);
        const userr = {
          id: response.data.id,
          username: response.data.username,
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          secondname: response.data.secondName,
          email: response.data.email,
          phone: response.data.phone,
          iin: response.data.iin,
          nameOrganization: response.data.nameOrganization,
          password: user.password,
        }
        closeFormDialog();
        setMessage("Пользователь успешно создан!");
        setSeverity("success");
        setOpen(true);
    
        setUsers([...users, userr]);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
      })
  }

  // Поиск пользователя
  const searchUser = () => {
    console.log(userForSearch);
    handleSearch();
  }

  const handleSearch = () => {
    const results = users.filter(user => user.username.includes(userForSearch));
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleChangeSearchQuery = (event) => {
    setUserForSearch(event.target.value);
    handleSearch();
  };

  const handleResetSearch = () => {
    setUserForSearch('');
    getUsers();
    setCurrentPage(1);
  };

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
    setIsEditingUser(true);
    setId(user.id);
    setUsername(user.username);
    setFirstname(user.firstName);
    setLastname(user.lastName);
    setSecondname(user.secondName);
    setPhone(user.phone);
    setEmail(user.email);
    setIin(user.iin);
    setNameOrganization(user.nameOrganization);
    setFormDialogTitle("Редактировать пользователя")
    setOpenFormDialog(true);
  }

  // Сохранить редактирование или создание пользователя
  const handleChange = (event) => {
    const user = {}

    user.username = username;
    user.firstName = firstname;
    user.lastName = lastname;
    user.secondName = secondname;
    user.email = email;
    user.phone = phone;
    user.iin = iin;
    user.nameOrganization = nameOrganization;
    user.password = password;

    const updatedUser = users.map(item => {
      if (item.id === id) {
        return { ...item, ...user};
      }
      return item;
    });

    setUsers(updatedUser);

    if(isEditingUser === false) {
      create(user);
    } else {
      update(user);
    }

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
      .catch((error) => {
        console.log(error);
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
    // Получение всех пользователей
    const getUsers = () => {
      axios.get("http://localhost:5000/api/users", config)
      .then((response) => {
        setUsers(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    getUsers();
  }, [])

  return (
    <>
    <Button type="submit" variant="text" onClick={() => navigate(-1)} sx={{ width:100}}><ArrowBackIcon /> Назад </Button>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Stack spacing={2}>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <Grid xs={10}>
          <SearchUsers 
            userForSearch={userForSearch} 
            setUserForSearch={setUserForSearch} 
            searchUser={searchUser} 
            handleChangeSearchQuery={handleChangeSearchQuery}
            handleResetSearch={handleResetSearch}
          />
        </Grid>
        <Grid xs={2}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={createUser}>Создать</Button>
        </Grid>
        
      </Grid>
      <TableContainer component={Paper} sx={{width: 800}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Действия</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user) => (
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
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        count={Math.ceil(users.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
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
            <Button onClick={handleDeleteUser}>Да</Button>
            <Button onClick={handleClose} autoFocus>Нет</Button>
          </DialogActions>
        </Dialog>
      </div>

      <FormDialog 
        openFormDialog={openFormDialog} 
        closeFormDialog={closeFormDialog} 
        handleChange={handleChange}
        formDialogTitle={formDialogTitle}
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
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <SnackbarComponent 
        open={open} 
        onClose={handleCloseSuccess} 
        severity={severity} 
        message={message} 
      />
      </Stack>
    </Box>
    </>
  )
};

export default Users;