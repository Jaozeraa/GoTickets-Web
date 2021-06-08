import React, { useEffect } from 'react';

import errorImg from '../../../assets/Error.svg';
import infoImg from '../../../assets/Info.svg';
import successImg from '../../../assets/Done.svg';
import warningImg from '../../../assets/Warning.svg';
import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
};

const icons = {
  info: <img src={infoImg} alt='Info'/>,
  error: <img src={errorImg} alt='Error'/>,
  warning: <img src={warningImg} alt='Warning'/>,
  success: <img src={successImg} alt='Success'/>
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, (message.time === 'short' ? 1500 : message.time === 'medium' ? 3000 : 5000));

    return () => {
      clearTimeout(timer);
    }
  }, [message, removeToast]);

  return (
    <Container
      style={style}
      type={message.type}
    >
      <div>
        {icons[message.type || 'info']}
        <p>{message.title}</p>
      </div>
    </Container>
  );
};

export default Toast;