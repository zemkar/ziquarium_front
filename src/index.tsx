import React from 'react';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

import RegistrationComponent from './auth/components/RegistrationComponent';
import UserIndex from './user/components/UserIndex';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} >
  
            <Route path="profile" element={< UserIndex />} />
            {/* <Route path="protected" element={< ProtectedPage />} /> */}
            {/* <Route path="fish" element={< FishIndex />} /> */}
  
            {/* <Route path="fish/:id"  element={<FishProfile /> } />  */}
            {/* <Route path="tank" element={< TankIndex />} /> */}
            {/* <Route path="plants" element={< PlantIndex />} /> */}
  
            <Route path="registration" element={< RegistrationComponent />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
);
