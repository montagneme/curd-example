import * as React from 'react';
const SvgComponent = props => (
  <svg width={24} height={24} className='icon' viewBox='0 0 1024 1024' {...props}>
    <path
      d='M736 480H544V288a32 32 0 0 0-64 0v192H288a32 32 0 0 0 0 64h192v192a32 32 0 0 0 64 0V544h192a32 32 0 0 0 0-64z'
      fill='currentColor'
    />
  </svg>
);
export default SvgComponent;
