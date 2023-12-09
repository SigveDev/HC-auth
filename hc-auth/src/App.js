import './App.css';
import React, { useEffect, useState } from 'react';
import { checkUserData } from './lib/appwrite';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';

// Private Pages
import Dashboard from './pages/private/Dashboard';
import CreateAppReg from './pages/private/CreateAppReg';
import EditAppReg from './pages/private/EditAppReg';
import Profile from './pages/private/Profile';
import Register from './pages/private/Register';

// Auth Pages
import Auth from './pages/Auth';

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkUserData()
      .then((account) => setAccount(account))
      .catch((error) => {
        console.log(error);
        setAccount("error");
      });
  }, []);

  const getProvider = () => {
    const provider = window.location.pathname.split("/")[2];
    return provider;
  }

  return (
    <BrowserRouter>
      <div className="Router">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={account === "error" ? <Login provider={false} /> : <Navigate to="/dashboard" />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={!account ? <Loader /> : (account !== "error" ? <Dashboard account={account} /> : <Navigate to="/login" />)} />
          <Route path="/dashboard/appreg/create" element={!account ? <Loader /> : (account !== "error" ? <CreateAppReg account={account} /> : <Navigate to="/login" />)} />
          <Route path="/dashboard/appreg/edit/:id" element={!account ? <Loader /> : (account !== "error" ? <EditAppReg account={account} /> : <Navigate to="/login" />)} />
          <Route path="/dashboard/create-user" element={!account ? <Loader /> : (account !== "error" ? <Register /> : <Navigate to="/login" />)} />
          <Route path="/profile" element={!account ? <Loader /> : (account !== "error" ? <Profile account={account} /> : <Navigate to="/login" />)} />

          {/* Auth Routes */}
          <Route path="/auth/:provider" element={account !== "error" ? <Auth account={account}/> : <Navigate to={"/login/" + getProvider()} />} />
          <Route path="/login/:provider" element={account === "error" ? <Login provider={true} /> : <Loader />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
