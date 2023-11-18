import React, { useCallback } from 'react';
import './index.scss';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  isError?: boolean;
  placeholder?: string;
  prevIcon?: React.ReactNode;
}

const Input: React.FC<IProps> = ({ value = '', onChange, placeholder = '', prevIcon, isError }) => {

  const handleChange = useCallback((e) => {
    onChange?.(e.target.value);
  }, [onChange]);

  return <div className={`management-input ${isError ? 'management-input_error' : ''}`}>
    {
      prevIcon && <div className='management-input-icon'>
        {prevIcon}
      </div>
    }
    <input className='management-input-content' value={value} onChange={handleChange} placeholder={placeholder} />
  </div>
}

export default Input;