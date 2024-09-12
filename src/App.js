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
import { PacmanLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz/DetailQuiz';
import ManageQuiz from './components/Admin/Content/ManageQuiz/ManageQuiz';

// CSS override cho loader (nếu cần)
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const NotFound = () => {
  return (<div className='container mt-3 alert alert-danger'>not found data</div>)
}

const App = () => {
  const location = useLocation();
  const showHeader = !location.pathname.includes('/admin') && !location.pathname.includes('/login') && !location.pathname.includes('/register') && !location.pathname.includes('/quiz/');

  // Sử dụng loading từ Redux
  const loading = useSelector(state => state.loadingReducer.loading);
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
  const account = useSelector(state => state.userReducer.account);
  const color = "#36d7b7"; // màu sắc loader

  return (
    <>
      <div className={`app-container ${loading ? 'loading' : ''}`}>
        {showHeader && <Header isAuthenticated={isAuthenticated} account={account} />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/user" element={<ListQuiz />} />
          <Route path="/quiz/:id" element={<DetailQuiz />} />
          <Route path="admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-user" element={<ManageUser />} />
            <Route path="manage-quiz" element={<ManageQuiz />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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
