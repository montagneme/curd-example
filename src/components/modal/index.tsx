import React, { useCallback } from 'react';
import Button, { TextButton } from '../button';
import { CSSTransition } from 'react-transition-group';
import AddIcon from '../../assets/add';
import './index.scss';

interface IProps {
  title?: string;
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ title, children, visible, onClose, onConfirm }) => {

  return <CSSTransition
    in={visible}
    timeout={200}
    classNames='management-modal-container'
    unmountOnExit
  >
    <div className='management-modal-container'>
      <div className={`management-modal ${visible ? 'management-modal_show' : ''}`}>
        <div className='management-modal-header'>
          <div className='management-modal-header-title'>
            {title}
          </div>
          <div className='management-modal-header-close' onClick={onClose}><AddIcon /></div>
        </div>
        <div className='management-modal-content'>
          {
            children
          }
        </div>
        <div className='management-modal-footer'>
          <div className='management-modal-footer-button'>
            <TextButton onClick={onClose}>Cancel</TextButton>
          </div>
          <div className='management-modal-footer-button'>
            <Button bgColor='#3561f4' onClick={onConfirm}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  </CSSTransition>
}

export default Modal;