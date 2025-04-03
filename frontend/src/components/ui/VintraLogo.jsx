import React from 'react';

const VintraLogo = ({ width = 40, height = 40 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M200 80L120 220L200 320L280 220L200 80Z" fill="#4CB4C6"/>
      <path d="M200 80L280 220L200 320" fill="#7ED6E8" fillOpacity="0.8"/>
      <path d="M200 80L120 220L200 320" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
      <path d="M200 80L280 220L200 320" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
      <path d="M140 180L200 80L260 180" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
      <path d="M140 180L200 320L260 180" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
      <path d="M200 80L200 320" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
      <path d="M120 220L280 220" stroke="#0A1D2E" strokeOpacity="0.1" strokeWidth="2"/>
    </svg>
  );
};

export default VintraLogo;