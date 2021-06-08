import React from 'react';

import { Container, Content, UserAvatar } from './styles';
import ImgLogo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <img onClick={() => history.push('/')} src={ImgLogo} alt="GoTickets" />
        <UserAvatar
          onClick={() => history.push('/perfil')}
          src={user.avatar_url}
          alt={user.name}
        />
      </Content>
    </Container>
  );
};

export default Header;
