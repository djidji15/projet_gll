import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hero from '../src/Components/Hero/Hero';
import Apropos from './Components/Apropos/Apropos';
import AvocatFav from './Components/AvocatFav/AvocatFav';
import Avocat from './Pages/Avocat/Avocat';
import Contavocat from './Components/Contavocat/Contavocat';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import ContactNC from './Pages/Contact/ContactNC';
import InfoC from './Components/InfoC/InfoC';
import AvocaUseFav from './Components/AvocaUseFav/AvocaUseFav';
import EspaceC from './Pages/EspaceClient/EspaceC';
import Rendezvous from './Components/Rendezvous/Rendezvous';
import Trouvezavo from './Components/Trouvezavo/Trouvezavo';
import Sign from './Pages/Sign/Sign';
import { GoogleLogin } from '@react-oauth/google';
import AvocatInfoPage from './Pages/avocatinfopage';
import EspaceAvocatPage from './Pages/espaceavocatpage';
import FAQPage from './Pages/faqpage';
import HomeNC from './Pages/Home/HomeNC';
import AvocatNC from './Pages/Avocat/AvocatNC';
import FAQPageNC from './Pages/faqpageNC';
import Login from './Pages/Sign/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeNC />} />
          <Route path='/user' element={<Home />} />
          <Route path='/Avocat' element={<Avocat />} />
          <Route path='/AvocatNC' element={<AvocatNC />} />
          <Route path='/EspaceC' element={<EspaceC />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/ContactNC' element={<ContactNC />} />
          <Route path='/FAQ' element={<FAQPage />} />
          <Route path='/FAQNC' element={<FAQPageNC />} />
          <Route path='/EspaceA' element={<EspaceAvocatPage />} />
          <Route path='/connexion' element={<Sign />} />
          <Route path='/login' element={<Login />} />
          <Route path='/avocatinfo' element={<AvocatInfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
