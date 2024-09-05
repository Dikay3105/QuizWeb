import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Home from './components/Home/Home';
import './App.scss';
import ManageUser from './components/Admin/Content/ManageUser/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login/Login';
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register/Register';
import { useState } from "react";
import { PacmanLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

// CSS override cho loader (nếu cần)
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const App = () => {
  const location = useLocation();
  const showHeader = !location.pathname.includes('/admin') && !location.pathname.includes('/login') && !location.pathname.includes('/register');
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#36d7b7");
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
  const account = useSelector(state => state.userReducer.account);

  return (
    <>
      <div className={`app-container ${loading ? 'loading' : ''}`}>
        {showHeader && <Header isAuthenticated={isAuthenticated} account={account} />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-user" element={<ManageUser />} />
          </Route>
          <Route path='/login' element={<Login setLoading={setLoading} />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>


      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {loading && (
        <div className="loader-container">
          <PacmanLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}

export default App;
