import React from 'react';
import './avocatlocalisation.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const avocatlocalisation = () => {
  const position = [36.69627798801233, 4.04547494421736];
  return (
    <div className='localisation'>
      <div className='titre'>
        <h1>Localisation : </h1>
      </div>
      <div className='carte'>
        <MapContainer
          center={position}
          zoom={14}
          style={{ width: '100vm', height: '50vh' }}
        >
          <TileLayer
            url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=EGUeZmzVLXNX7X5e1KjZ'
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Marker position={position}>
            <Popup>L'adresse de l'avocat</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
export default avocatlocalisation;
