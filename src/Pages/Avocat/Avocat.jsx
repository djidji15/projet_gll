import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contavocat from '../../Components/Contavocat/Contavocat';
import NavbarClient from '../../Components/Navbar/navbarclient';
import Footer from '../../Components/Footer/footer';
import './Avocat.css';
import { Link } from 'react-router-dom';

const Avocat = () => {
  const [searchParams, setSearchParams] = useState({
    nom: '',
    specialite: '',
    region: '',
  });
  const [avocats, setAvocats] = useState([]);

  useEffect(() => {
    // Fetch avocats based on searchParams
    const fetchAvocats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/lawyers/', {
          params: searchParams,
        });
        setAvocats(response.data);
      } catch (error) {
        console.error('Error fetching avocats:', error);
      }
    };

    fetchAvocats();
  }, [searchParams]); // Re-fetch when searchParams change

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/lawyers/', {
        params: searchParams,
      });
      setAvocats(response.data);
    } catch (error) {
      console.error('Error fetching avocats:', error);
    }
  };

  return (
    <div>
      <NavbarClient />
      <div className='Trouver-avocat-container'>
        <p>Trouvez l'Avocat Idéal</p>
        <div className='all-container'>
          <input
            type='text'
            placeholder='Nom'
            value={searchParams.nom}
            onChange={(e) =>
              setSearchParams({ ...searchParams, nom: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Specialite'
            value={searchParams.specialite}
            onChange={(e) =>
              setSearchParams({ ...searchParams, specialite: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Region'
            value={searchParams.region}
            onChange={(e) =>
              setSearchParams({ ...searchParams, region: e.target.value })
            }
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
      </div>
      <div className='avocat-container'>
        {avocats.map((avocat, i) => (
          <Link to='/avocatinfo'>
            <Contavocat
              key={i}
              id={avocat.id}
              name={avocat.name}
              specialité={avocat.specialité}
              image={avocat.cover}
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Avocat;
