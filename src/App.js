import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login.js";
import "./styles.scss";
import Home from "./Pages/Home.js";
import Profil from './Pages/Profil.js';
import Ndf from './Pages/Ndf.js';
import Conges from './Pages/Conges.js';
import AddConges from './Pages/AddConges.js';
import CongesComptable from './Pages/Comptable/Conges.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/ndf" element={<Ndf />} />
      <Route path="/conges" element={<Conges />} />
      <Route path="/conges/add" element={<AddConges />} />
      <Route path="/admin/conges" element={<CongesComptable />} />
    </Routes>
  );
}

export default App;
