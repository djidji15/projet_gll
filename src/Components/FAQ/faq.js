import React from 'react';
import './faq.css'

const FAQ = ({ question, reponse }) => {
  return (
    <div className='faq'>
      <h4>{question}</h4>
      <p>{reponse}</p>
    </div>
  );
};

export default FAQ;
