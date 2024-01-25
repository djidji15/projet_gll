import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvocatFav.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Contavocat from '../Contavocat/Contavocat';
import avocat from '../../Assets/avocat';

const AvocatFav = () => {
  const [avocats, setAvocats] = useState([]);

  useEffect(() => {
    // Fetch avocat data when the component mounts
    const fetchAvocats = async () => {
      try {
        const response = await axios.get('/api/avocats');
        setAvocats(response.data);
      } catch (error) {
        console.error('Error fetching avocats:', error);
      }
    };

    fetchAvocats();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts
  return (
    <div className='avocat-ved-container'>
      <h1>Avocats En Vedette</h1>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {avocat.slice(0, 6).map((avocat, i) => {
            {
              /*meme chose ici ajoute s */
            }
            return (
              <SwiperSlide key={i}>
                <Contavocat
                  key={i}
                  id={avocat.id}
                  name={avocat.name}
                  specialité={avocat.specialité}
                  image={avocat.cover}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default AvocatFav;
