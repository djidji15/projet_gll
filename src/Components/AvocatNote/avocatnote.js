import React from 'react'
import note from '../../img/stars.png'
import './avocatnote.css'

export const AvocatNote = () => {
  return (
    <div className='avocatnote'>
        <div className='titre'>
            <h1>Votre Note :</h1>
        </div>
        <div className='note'>
            <img src={note} />
        </div>
    </div>
  )
}
