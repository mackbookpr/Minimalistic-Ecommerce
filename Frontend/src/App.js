import './App.css';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import Categories from './Components/Categories.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultPage from './Pages/DefaultPage.jsx';
import DefaultProductPage from './Pages/DefaultProductPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { CartProvider } from "./CartContext.js";
import Register from './Components/RegisterationPage.jsx';
// import LoginPage from './Components/LoginPage.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DefaultPage />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          {/* <Route path="/LoginPage" element={<LoginPage />}></Route> */}
          <Route path="/:category" element={<DefaultProductPage />}></Route>
          <Route path="/:category/:ID" element={<ProductPage />}></Route>
        </Routes>
      </BrowserRouter >
    </CartProvider>
  );
}

export default App;
