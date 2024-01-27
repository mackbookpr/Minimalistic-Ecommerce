import './App.css';
import './index.css'
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import KidSection from './Pages/KidSection';
import WomenSection from './Pages/WomenSection';
import MenSection from './Pages/MenSection';
import GlobalStyles from './Styles/Global';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MenSection" element={<MenSection />} />
        <Route path="/WomenSection" element={<WomenSection />} />
        <Route path="/KidSection" element={<KidSection />} />
        {/* <Route path="/LatestArrivals" element={<LatestArrivals />}/> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
