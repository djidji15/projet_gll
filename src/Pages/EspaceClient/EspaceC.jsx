import React from 'react';
import './EspaceC.css';
import InfoC from '../../Components/InfoC/InfoC';
import AvocaUseFav from '../../Components/AvocaUseFav/AvocaUseFav';
import Rendezvous from '../../Components/Rendezvous/Rendezvous';
import Trouvezavo from '../../Components/Trouvezavo/Trouvezavo';

const EspaceC = () => {
  return (
    <div>
      <InfoC />
      <AvocaUseFav />
      <Rendezvous />
      <Trouvezavo />
    </div>
  );
};

export default EspaceC;
