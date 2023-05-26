import axios from "axios";
import { Typography } from '@mui/material'
import ResponsiveDrawer from './ResponsiveDrawer'
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
const Home = () => {

  return (
      <ResponsiveDrawer />
  )
};

export default Home;