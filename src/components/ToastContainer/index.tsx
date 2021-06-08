import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const transition = useTransition(messages, {
    from: { transform: 'translate3d(0,-120%,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-120%,0)' },
  });

  return (
    <Container>
      <div>
        {transition(({ transform }, item) => (
          <Toast message={item} style={{ transform }} />
        ))}
      </div>
    </Container>
  );
};

export default ToastContainer;
