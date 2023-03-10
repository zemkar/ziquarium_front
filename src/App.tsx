import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { fillTank } from './tank/actions/tankFilling';

import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthIndex from './auth/components/AuthIndex';
import Navbar from './navigation/Navbar';
import { getShopData } from './shop/actions/shop';
// import userService from './user/service/userService';
import { toast } from 'react-toastify';

function App() {

  const location = useLocation();
  const dispatch: any = useAppDispatch()

  const { fishes, plants } = useAppSelector(state => state.tankReducer.tank);
  const { shopItemsData } = useAppSelector(state => state.shopReducer.shopItemsReducer);
  const isFilled = useRef<boolean>(false);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const session_id = params.get('session_id')

    if (success === 'true') {
      if (session_id) {
        toast.success("Thank you. Payment success.");
      }
    }
  }, [location]);

  if (!shopItemsData) {
    dispatch(getShopData())
  }

  useEffect(() => { // fish & plants re-filler 
    // console.log("check tankReducer \n fishes:", fishes, "\n plants:", plants)
    if (!isFilled.current && (fishes.length < 1 || plants.length < 1)) {
      // console.log("isFilled:", isFilled.current, "no data in store")
      isFilled.current = true;
      var storedFishes = localStorage.getItem('fishes')
      if (storedFishes) storedFishes = JSON.parse(storedFishes)
      var storedPlants = localStorage.getItem('plants')
      if (storedPlants) storedPlants = JSON.parse(storedPlants)
      // console.log("data in storage: \n storedFishes:", storedFishes, "\n plants:", storedPlants)
      dispatch(fillTank({ fishes: storedFishes, plants: storedPlants }))
      // console.log("after filling tank \n fishes:", fishes, "\n plants after:", plants)
    }

    // console.log("filled", isFilled.current);
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
