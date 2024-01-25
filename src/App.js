import React from 'react';
import './App.css';
import Hero from '../src/Components/Hero/Hero';
import Apropos from './Components/Apropos/Apropos';
import AvocatFav from './Components/AvocatFav/AvocatFav';
import Avocat from './Pages/Avocat/Avocat';
import Contavocat from './Components/Contavocat/Contavocat';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import InfoC from './Components/InfoC/InfoC';
import AvocaUseFav from './Components/AvocaUseFav/AvocaUseFav';
import EspaceC from './Pages/EspaceClient/EspaceC';
import Rendezvous from './Components/Rendezvous/Rendezvous';
import Trouvezavo from './Components/Trouvezavo/Trouvezavo';
import Sign from './Pages/Sign/Sign';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
