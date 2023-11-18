import React, { useCallback } from 'react';
import { transferHighLight } from './utils';
import './index.scss';

export enum HighLightType {
  T = 'Text',
  HL = 'HightLight'
}

export type HighLightUnit = {
  type: HighLightType;
  value: string;
}

interface IProps {
  textList: HighLightUnit[];
}

const HightLight: React.FC<IProps> = ({ textList = [] }) => {
  return textList.map((unit, index) => {
    if (unit.type === HighLightType.HL) {
      return <span className='management-highlight-text' key={index}>{unit.value}</span>
    }
    return <span key={index}>{unit.value}</span>
  });
}
export {
  transferHighLight
};
export default HightLight;