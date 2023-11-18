import React, { useCallback, useState } from 'react';
import Modal from '../../components/modal';
import Form, { FormItem, useForm } from '../../components/form';
import Input from '../../components/input';

interface IProps {
  children: React.ReactElement;
  onSubmit?: (formData) => void;
  values?: {
    [key: string]: string;
  }
}

const SDKForm: React.FC<IProps> = ({ children, onSubmit, values }) => {
  const [visible, setVisible] = useState(false);
  const form = useForm({
    initValues: values
  });

  const handleOpen = useCallback(() => {
    form.reset();
    setVisible(true);
  }, [form]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleConfirm = useCallback(() => {
    const status = form.validate();
    if (status) {
      // 提交
      onSubmit?.(form.getFormData());
      handleClose();
    }
  }, [form, onSubmit, handleClose]);

  return <>
    {
      React.cloneElement(children, {
        onClick: handleOpen
      })
    }
    <Modal title={`${values ? 'Edit' : 'Create'} SDK`} visible={visible} onClose={handleClose} onConfirm={handleConfirm}>
      <Form form={form}>
        <FormItem name='clientName' label='Client name' required>
          <Input />
        </FormItem>
        <FormItem name='boardName' label='Board' required>
          <Input />
        </FormItem>
        <FormItem name='tags' label='Tags' help={`Separated by ',' labels will be automatically split`}>
          <Input />
        </FormItem>
        <FormItem name='requestor' label='Requestor' required>
          <Input />
        </FormItem>
      </Form>
    </Modal>
  </>;
}

export default SDKForm;