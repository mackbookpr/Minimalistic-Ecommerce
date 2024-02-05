import './App.css';
import './index.css'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenPage from './Pages/MenPage.jsx';
import HeroSection from './Components/HeroSection.jsx';
import WomenSection from './Pages/WomenPage.jsx';
import Global from './Styles/Global.js'
// import KidSection from './Pages/KidsPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Global />
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/MenPage" element={<MenPage />} />
        <Route path="/WomenSection" element={<WomenSection />} />
        {/* <Route path="/KidSection" element={<KidSection />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
