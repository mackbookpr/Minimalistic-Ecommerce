// src/App.js
import React from 'react';
import './App.css';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultPage from './Pages/DefaultPage.jsx';
import DefaultProductPage from './Pages/DefaultProductPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import Register from './Components/RegisterationPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import OrderDetails from './Pages/OrderDetails.jsx';
import Checkout from './Components/Checkout.jsx';
import ErrorPage from './Components/Error.jsx';
import { AnimatePresence } from 'framer-motion';
import AnimationPage from './AnimationPage.jsx';
import { useLoading } from './LoadingContext.js';
import Spinner from './Components/Spinner';

function App() {
  const location = useLocation();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <AnimatePresence>
        <AnimationPage><Navbar /></AnimationPage>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimationPage><DefaultPage /></AnimationPage>} />
          <Route path="/Register" element={<AnimationPage><Register /></AnimationPage>} />
          <Route path="/LoginPage" element={<AnimationPage><LoginPage /></AnimationPage>} />
          <Route path="/ErrorPage" element={<AnimationPage><ErrorPage /></AnimationPage>} />
          <Route path="/:category" element={<AnimationPage><DefaultProductPage /></AnimationPage>} />
          <Route path="/:category/:ID" element={<AnimationPage><ProductPage /></AnimationPage>} />
          <Route path="/checkout" element={<AnimationPage><Checkout /></AnimationPage>} />
          <Route path="/orders" element={<AnimationPage><OrderDetails /></AnimationPage>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
