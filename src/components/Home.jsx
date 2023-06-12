import axios from "axios";
import { Typography } from '@mui/material'
import ResponsiveDrawer from './ResponsiveDrawer'
import Appbar from './Appbar';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const Home = () => {

  return (
    // <Appbar />
    <ResponsiveDrawer />
  )
};

export default Home;