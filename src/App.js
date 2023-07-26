import './App.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import AuthComponent from './components/AuthComponent'
import { Routes, Route, Navigate, redirect } from 'react-router-dom';
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
import AdminEditClient from './components/admin/AdminEditClient';
import Patients from './components/Patients';

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import { useAuth } from './hook/useAuth';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3463ca"
    },
  },
});

  const adminRole = 3;
  const doctorRole = 1;
  const managerRole = 2;
  const userRole = 4;

function App() {

  // useEffect(() => {
    
  // }, [])

  const auth = useAuth();

  const isAuthenticated = localStorage.getItem('accessToken') && localStorage.getItem('refreshToken');

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} >
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
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route 
          path="/add-client"
          element={
            <RequireAuth>
              <ReceptionComponents>
                <AddClient />
              </ReceptionComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/admin/patients"
          element={
            <RequireAuth>
              <AdminComponents>
                <Patients userRole="admin"/>
              </AdminComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/admin/edit-client/:id"
          element={
            <RequireAuth>
              <AdminComponents>
                <AdminEditClient />
              </AdminComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/manager/patients"
          element={
            <RequireAuth>
              <ManagerComponents>
                <Patients userRole="manager"/>
              </ManagerComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/manager/edit-client/:id"
          element={
            <RequireAuth>
              <ManagerComponents>
                <ManagerEditClient />
              </ManagerComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/doctor/patients"
          element={
            <RequireAuth>
              <DoctorComponents>
                <Patients userRole="doctor"/>
              </DoctorComponents>
            </RequireAuth>
          }
        />
        <Route 
          path="/doctor/edit-client/:id"
          element={
            <RequireAuth>
              <DoctorComponents>
                <DoctorEditClient />
              </DoctorComponents>
            </RequireAuth>
          }
        />
        </Route>
      </Routes>
      <TokenManager />
    </ThemeProvider>
  );
}

const ReceptionComponents = ({children}) => {
  if (localStorage.getItem("userRole") == userRole) {
    return <>{children} </>
  } else {
    return  <Navigate to={'/main'} />
  }
}

const ManagerComponents = ({children}) => {
  if (localStorage.getItem("userRole") == managerRole) {
    return <>{children} </>
  } else {
    return  <Navigate to={'/main'} />
  }
}

const DoctorComponents = ({children}) => {
  if (localStorage.getItem("userRole") == doctorRole) {
    return <>{children} </>
  } else {
    return  <Navigate to={'/main'} />
  }
}

const AdminComponents = ({children}) => {
  if (localStorage.getItem("userRole") == adminRole) {
    return <>{children} </>
  } else {
    return  <Navigate to={'/main'} />
  }
}

export default App;