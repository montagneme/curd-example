import React, { createContext } from 'react';
import useForm, { IForm } from './useForm';
import FormItem from './components/formItem';
import FormLabel from './components/formLabel';

export const FormContext = createContext<IForm>({} as IForm);
const { Provider } = FormContext;

interface IProps {
  children: React.ReactNode;
  initValues?: {
    [key: string]: any;
  };
  form?: IForm;
}

const Form: React.FC<IProps> = ({ children, form: defaultForm, initValues }) => {
  const form = useForm({ initValues }, defaultForm);
  return <div className='management-form'>
    <Provider value={form}>
      {children}
    </Provider>
  </div>
}

export {
  FormItem,
  FormLabel,
  useForm
}
export default Form;