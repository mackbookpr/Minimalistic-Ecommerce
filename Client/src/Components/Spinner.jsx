// src/Components/Spinner.jsx
import React from 'react';
import '../App.css';

const Spinner = () => {
  return (
    <div className="spinner-container flex flex-col gap-3">
      <h1 className='md:text-5xl text-2xl'>Minimalistic Ecommerce</h1>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;