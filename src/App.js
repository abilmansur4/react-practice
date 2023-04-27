import './App.css';
// import AuthComponent from './components/AuthComponent'
import { Routes, Route, Navigate } from 'react-router-dom';

import TestComponent from './components/TestComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent'
import Home from './components/Home';
import Layout from './components/Layout';
import ForgotPassword from './components/ForgotPassword';

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

function App() {

  return (
      // <Routes>
      //   <Route path="/" element={<Home />}></Route>
      //   <Route path="/login" element={<LoginForm />}></Route>
      //   <Route path="/test" element={<TestComponent />}></Route>
      // </Routes>
    // <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path='/forgot_password' element={<ForgotPassword />}/>
          <Route
            path="/test"
            element={
              <RequireAuth>
                <TestComponent />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    // </AuthProvider>
  );
}

export default App;

