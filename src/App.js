import './App.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import AuthComponent from './components/AuthComponent'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import TokenManager from './hoc/TokenManager';
import Login from './components/Login';
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword';
import Cabinet from './components/Cabinet';
import EditCabinet from './components/EditCabinet';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Home from './components/Home';
import Main from './components/Main';
import Projects from './components/Projects';
import Users from './components/admin/Users';
import TestComponent from './components/TestComponent';
import AddClient from './components/reception/AddClient';
import ManagerEditClient from './components/manager/ManagerEditClient';
import DoctorEditClient from './components/doctor/DoctorEditClient';

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

import { cyan, teal, blueGrey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3463ca"
    },
  },
});

function App() {

  // useEffect(() => {
    
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}>
        <Route 
          path="/main" 
          element={
            // <RequireAuth>
              <Main />
            // </RequireAuth>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot_password' element={<ForgotPassword />}/>
        {/* <Route path='/cabinet' element={<CabinetComponent />}/>
        <Route path='/test' element={<TestComponent />}/> */}
        <Route 
          path="/cabinet"
          element={
            <RequireAuth>
              <Cabinet />
            </RequireAuth>
          }
        />
        <Route 
          path="/cabinet/edit"
          element={
            <RequireAuth>
              <EditCabinet />
            </RequireAuth>
          }
        />
        <Route 
          path="/projects"
          element={
            <RequireAuth>
              <Projects />
            </RequireAuth>
          }
        />
        <Route 
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route 
          path="/users_test"
          element={
            <RequireAuth>
              <TestComponent />
            </RequireAuth>
          }
        />
        <Route 
          path="/add-client"
          element={
            <RequireAuth>
              <AddClient />
            </RequireAuth>
          }
        />
        <Route 
          path="/manager/edit-client"
          element={
            <RequireAuth>
              <ManagerEditClient />
            </RequireAuth>
          }
        />
        <Route 
          path="/doctor/edit-client"
          element={
            <RequireAuth>
              <DoctorEditClient />
            </RequireAuth>
          }
        />
        </Route>
      </Routes>
      <TokenManager />
    </ThemeProvider>
  );
}

export default App;