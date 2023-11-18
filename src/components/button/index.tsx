import React, { useCallback } from 'react';
import './index.scss';
interface IProps {
  children: React.ReactNode;
  prevIcon?: React.ReactNode;
  bgColor?: string;
  onClick?: () => void;
}

interface ITextButtonProps {
  children: React.ReactNode;
  prevIcon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ children, prevIcon, bgColor, onClick }) => {
  return (
    <div className='management-button' style={bgColor ? { backgroundColor: bgColor } : {}} onClick={onClick}>
      {prevIcon && <div className='management-button-icon'>{prevIcon}</div>}
      <div className='management-button-text'>{children}</div>
    </div>
  );
}

const TextButton: React.FC<ITextButtonProps> = ({ children, prevIcon, color, onClick }) => {
  return <div className='management-textbutton' style={color ? { color } : {}} onClick={onClick}>
    {prevIcon && <div className='management-textbutton-icon'>{prevIcon}</div>}
    <div className='management-textbutton-text'>{children}</div>
  </div>
}

export {
  TextButton
}
export default Button;