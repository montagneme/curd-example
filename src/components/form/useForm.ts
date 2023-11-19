import { useCallback, useEffect, useRef, useState } from 'react';

// 提供给外部可控的form实例
export interface IForm {
  valueMap: {
    [key: string]: any;
  };
  errorMap: {
    [key: string]: any;
  };
  onChange: (name: string, value: string) => void;
  validate: () => boolean;
  registerField: (name: string, info?: any) => void;
  reset: () => void;
  getFormData: () => {
    [key: string]: any;
  };
}

export default function useForm ({ initValues }: { initValues? }, form?: IForm): IForm {
  const [valueMap, setValueMap] = useState(initValues || {}); // 储存表单字段的值
  const [errorMap, setErrorMap] = useState({}); // 错误信息表
  const fieldMap = useRef({}); // 记录内部所有字段的信息

  useEffect(
    () => {
      if (initValues) {
        setValueMap(initValues);
      }
    },
    [initValues]
  );

  const getFormData = useCallback(
    () => {
      const defaultValue = {};
      for (const name in fieldMap.current) {
        defaultValue[name] = fieldMap.current[name].initValue;
      }
      return {
        ...defaultValue,
        ...valueMap
      };
    },
    [valueMap]
  );

  const handleReset = useCallback(
    () => {
      setValueMap(initValues || {});
      setErrorMap({});
    },
    [initValues]
  );

  const handleChange = useCallback(
    (name, value) => {
      setValueMap({
        ...valueMap,
        [name]: value
      });
    },
    [valueMap]
  );

  const registerField = useCallback((name, info) => {
    fieldMap.current[name] = {
      ...info,
      initValue: ''
    };
  }, []);

  const validate = useCallback(
    () => {
      let status = true;
      const errorMap = {};
      for (const name in fieldMap.current) {
        const { required } = fieldMap.current[name];
        const value = valueMap[name];
        if (required && !value) {
          // 先只处理必填校验
          status = false;
          errorMap[name] = 'required';
        } else {
          delete errorMap[name];
        }
      }
      setErrorMap(errorMap);
      return status;
    },
    [valueMap]
  );

  return {
    valueMap,
    onChange: handleChange,
    errorMap,
    validate,
    getFormData,
    registerField,
    reset: handleReset,
    ...form
  };
}
