import React from 'react';
import FAQ from './faq.js'; 
import faqdata from '../../data/faqdata.js';
import './faqs.css'
const FAQs = () => {
  return (
    <div className='faqs'>
        <div>
        <h1>Foire Aux Questions (FAQ)</h1>
        </div>
        <div>
      {faqdata.map((item, index) => (
        <FAQ key={index} question={item.question} reponse={item.reponse} />
      ))}
      </div>
    </div>
  );
};

export default FAQs;
