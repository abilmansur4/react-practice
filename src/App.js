import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import AuthComponent from './components/AuthComponent'
import { Routes, Route, Navigate } from 'react-router-dom';

import TestComponent from './components/TestComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent'
import ForgotPassword from './components/ForgotPassword';
import CabinetComponent from './components/CabinetComponent';
import EditCabinet from './components/EditCabinet';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Home from './components/Home'

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />}>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path='/forgot_password' element={<ForgotPassword />}/>
        {/* <Route path='/cabinet' element={<CabinetComponent />}/>
        <Route path='/test' element={<TestComponent />}/> */}
        <Route
          path="/test"
          element={
            <RequireAuth>
              <TestComponent />
            </RequireAuth>
          }
        />
        <Route 
          path="/cabinet"
          element={
            <RequireAuth>
              <CabinetComponent />
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
        </Route>
      </Routes>
  );
}

export default App;

