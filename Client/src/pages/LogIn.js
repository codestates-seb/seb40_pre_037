import React from 'react';
import styled from 'styled-components';
import LoginComponent from '../components/LoginComponent';
import Nav from '../components/Nav';

const WrapperAll = styled.div`
  display: flex;
  background-color: #f1f2f3;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const WrapperNav = styled.div`
  height: 55px;
`;

const WrapperBody = styled.div`
  margin: 0 auto;
`;

function LogIn() {
  return (
    <WrapperAll>
      <WrapperNav>
        <Nav />
      </WrapperNav>
      <WrapperBody>
        <LoginComponent />
      </WrapperBody>
    </WrapperAll>
  );
}

export default LogIn;
