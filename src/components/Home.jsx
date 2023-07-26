import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer';
import { useAuth } from '../hook/useAuth';

const Home = () => {

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    auth.accessToken ? navigate("/main") : navigate("/login")
  }, [])

  return (
    <>
    <ResponsiveDrawer />
    </>
  )
};

export default Home;