import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { fillTank } from './tank/actions/tankFilling';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthIndex from './auth/components/AuthIndex';
import Navbar from './navigation/Navbar';
import { getShopData } from './shop/actions/shop';
// import userService from './user/service/userService';

function App() {

  const dispatch: any = useAppDispatch()
  
  const { fishes, plants } = useAppSelector(state => state.tankReducer.tank);
  const isFilled = useRef<boolean>(false);


  // useEffect(() => {
  //   userService.usersList().then((res:any)=>{console.log("users:", res)}, (err:any)=> {console.log("users error:", err)})
  //   console.log("App path:", window.location.pathname);
  // }, [])
  dispatch(getShopData())
  
  useEffect(() => { // fish & plants re-filler 
    console.log("check tankReducer \n fishes:", fishes, "\n plants:", plants)
    if (!isFilled.current && (fishes.length < 1 || plants.length < 1)) {
      console.log("isFilled:", isFilled.current, "no data in store")
      isFilled.current = true;
      var storedFishes = localStorage.getItem('fishes')
      if (storedFishes) storedFishes = JSON.parse(storedFishes)
      var storedPlants = localStorage.getItem('plants')
      if (storedPlants) storedPlants = JSON.parse(storedPlants)
      console.log("data in storage: \n storedFishes:", storedFishes, "\n plants:", storedPlants)
      dispatch(fillTank({fishes: storedFishes, plants: storedPlants}))
      console.log("after filling tank \n fishes:", fishes, "\n plants after:", plants)
    }
    
    console.log("filled", isFilled.current);
  }, [fishes, plants, isFilled, dispatch])

  
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
      /><div className='context'>
      <Outlet /></div>

    </div>
  );
}

export default App;
