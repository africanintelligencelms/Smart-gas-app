
import React from 'react';

const GasCylinderIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88m-4.242 4.242L6.343 18.657m11.314-11.314L15 6.22m-2.121 2.121a3 3 0 00-4.242 0" />
  </svg>
);

export default GasCylinderIcon;
