import React, { useState, useEffect } from "react";
import axios from 'axios';

import ResponsiveDrawer from './ResponsiveDrawer';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';


const TestComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице
  const [users, setUsers] = useState([]);
  
  // Вычисляем индекс первого и последнего элемента на текущей странице
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = users.slice(firstIndex, lastIndex);
  

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  // Получение всех пользователей
  const getUsers = () => {
    axios.get("http://localhost:5000/api/users", config)
    .then((response) => {
      // console.log(response);
      setUsers(response.data);
      console.log(response.data);
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    getUsers();
  }, [])

  // Обработчик изменения страницы
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Заголовок</TableCell>
              <TableCell>Описание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(users.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default TestComponent;