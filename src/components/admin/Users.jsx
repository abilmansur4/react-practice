import axios from "axios";
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

const Users = () => {

  axios.defaults.withCredentials = true;

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [secondname, setSecondname] = useState('');

  const [users, setUsers] = useState([]);

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/users", config)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        // console.log(users);
        // setUsername(response.data.username);
        // setFirstname(response.data.firstName);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      })
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
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  <Tooltip title="Редактировать">
                    <IconButton>
                      <EditIcon sx={{ width: 14, height: 14 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton>
                      <HighlightOffIcon sx={{ width: 14, height: 14 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default Users;