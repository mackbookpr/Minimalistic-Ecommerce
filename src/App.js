import './App.css';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultPage from './Pages/DefaultPage.jsx';
import DefaultElectronics from './Pages/Electronics/DefaultElectronics.jsx';
import DefaultSkinCare from './Pages/SkinCare/DefaultSkinCare.jsx';
import DefaultFurniture from './Pages/Furniture/DefaultFurniture.jsx';
import DefaultKitchen from './Pages/Kitchen/DefaultKitchen.jsx';
import DefaultProductPageElectronics from './Pages/Electronics/DefaultProductPageElectronics.jsx';
import DefaultProductPageSkinCare from './Pages/SkinCare/DefaultProductPageSkinCare.jsx'
import { CartProvider } from "./CartContext.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DefaultPage />}></Route>
          <Route path="/Electronics" element={<DefaultElectronics />}></Route>
          <Route path="/Electronics/:productID" element={<DefaultProductPageElectronics />}></Route>
          <Route path="/SkinCare" element={<DefaultSkinCare />} />
          <Route path="/SkinCare/:productID" element={<DefaultProductPageSkinCare />}></Route>
          <Route path="/Furniture" element={<DefaultFurniture />} />
          <Route path="/Kitchen" element={<DefaultKitchen />} />
        </Routes>
      </BrowserRouter >
    </CartProvider>
  );
}

export default App;
