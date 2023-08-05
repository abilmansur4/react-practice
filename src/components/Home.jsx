import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet,  } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer';
import { useAuth } from '../hook/useAuth';

const Home = () => {

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname;

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(-1);
    }
  }, [location.pathname])

  return (
    <ResponsiveDrawer />
    // <Outlet />
  )
};

export default Home;