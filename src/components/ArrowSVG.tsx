import * as React from 'react';

type ArrowProps = {
  direction: 'back' | 'forward';
};

export const Arrow: React.FC<ArrowProps> = ({ direction }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d={direction === 'back' ? 'M328 112L184 256l144 144' : 'M184.001 400L328.001 256L184.001 112'}
    />
  </svg>
);
