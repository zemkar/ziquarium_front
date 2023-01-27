import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthIndex from './auth/components/AuthIndex';
import Navbar from './navigation/Navbar';

function App() {

  useEffect(() => {
    console.log("App path:", window.location.pathname);
  }, [])
  
  return (
    <div className="App">
      <Navbar />
      <AuthIndex />
      <ToastContainer
        position="bottom-left"
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
      <Outlet />
    </div>
  );
}

export default App;
