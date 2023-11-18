import React, { useContext, useEffect, useMemo } from 'react';
import { FormContext } from '../..';
import FormLabel from '../formLabel';
import './index.scss';

interface IProps {
  children: React.ReactElement;
  name: string;
  label?: string;
  required?: boolean;
  help?: string;
}

const FormItem: React.FC<IProps> = ({ children, name, label, required, help }) => {

  const { valueMap, onChange, registerField, errorMap } = useContext(FormContext);

  useMemo(() => {
    registerField(name, {
      required
    });
  }, [registerField, name, required]);

  const error = errorMap[name];

  const childrenCmp = useMemo(() => {
    return React.cloneElement(children, {
      value: valueMap[name],
      onChange: onChange.bind(null, name),
      isError: !!error
    })
  }, [children, valueMap, onChange, name]);

  return <div className='management-formitem'>
    <FormLabel label={label} isRequire={required} error={error} help={help}>
      {
        childrenCmp
      }
    </FormLabel>
  </div>
}

export default FormItem;