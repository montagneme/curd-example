import React, { useContext, useEffect, useMemo } from 'react';
import HelpIcon from '../../../../assets/help';
import './index.scss';

interface IProps {
  children: React.ReactElement;
  isRequire?: boolean;
  help?: string;
  label: string;
  error?: string;
}

const FormLabel: React.FC<IProps> = ({ children, label, isRequire, help, error }) => {

  return <div className='management-formlabel'>
    <div className='management-formlabel-name'>
      {
        isRequire && <div className='management-formlabel-name-require'>
          *
        </div>
      }
      <div className='management-formlabel-name-text'>
        <div className='management-formlabel-name-text-label'>{label}</div>
        {
          help && <div className='management-formlabel-name-text-help' title={help}><HelpIcon /></div>
        }
        :
      </div>
    </div>
    <div className='management-formlabel-cmp'>
      {
        children
      }
    </div>
    {
      error && <div className='management-formlabel-error'>
        {error}
      </div>
    }
  </div>
}

export default FormLabel;