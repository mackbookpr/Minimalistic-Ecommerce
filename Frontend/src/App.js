import './App.css';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import { Routes, Route} from 'react-router-dom';
import DefaultPage from './Pages/DefaultPage.jsx';
import DefaultProductPage from './Pages/DefaultProductPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import Register from './Components/RegisterationPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import OrderDetails from './Pages/OrderDetails.jsx';
import Checkout from './Components/Checkout.jsx';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/:category" element={<DefaultProductPage />} />
        <Route path="/:category/:ID" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/OrderDetails" element={<OrderDetails />} />
      </Routes>
    </>
  );
}

export default App;
