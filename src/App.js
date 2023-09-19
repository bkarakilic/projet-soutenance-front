import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login/Login.js";
import "./styles.scss";
import Home from "./Pages/Home/Home";
import Profil from './Pages/Profil/Profil';
import Ndf from './Pages/Ndf/Ndf';
import Conges from './Pages/Conges/Conges';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/ndf" element={<Ndf />} />
      <Route path="/conges" element={<Conges />} />
    </Routes>
  );
}

export default App;
