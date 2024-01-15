import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Men from './Pages/MenSection';
import HomePage from './Pages/HomePage';
import LatestArrivals from './Pages/LatestArrivals';
import KidSection from './Pages/KidSection';
import WomenSection from './Pages/WomenSection';
import MenSection from './Pages/MenSection';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MenSection" element={<MenSection />} />
        <Route path="/WomenSection" element={<WomenSection />} />
        <Route path="/KidSection" element={<KidSection />} />
        {/* <Route path="/LatestArrivals" element={<LatestArrivals />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
