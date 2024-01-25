import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvocaUseFav.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AvocatfavUse from '../AvocatfavUse/AvocatfavUse';
import avocat from '../../Assets/avocat';

const AvocaUseFav = () => {
  const [avocats, setAvocats] = useState([]);

  useEffect(() => {
    const fetchAvocats = async () => {
      try {
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
        setAvocats(response.data); // Assuming your API returns an array of avocats
      } catch (error) {
        console.error('Error fetching avocats:', error);
      }
    };

    fetchAvocats();
  }, []); // Empty dependency array ensures the effect runs only once
  return (
    <div className='avocat-ved-container1'>
      <h1>Avocats Favoris</h1>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {avocat.map((avocat, i) => {
            {
              /*d agui a feriel avocat nni ernouyas s pour faire le link */
            }
            return (
              <SwiperSlide key={i}>
                <AvocatfavUse
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

export default AvocaUseFav;
