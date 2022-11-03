import React from 'react';
import styled from 'styled-components';
import LoginComponent from '../components/LoginComponent';

const WrapperAll = styled.div`
  display: flex;
  background-color: #f1f2f3;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const WrapperBody = styled.div`
  margin: 0 auto;
`;

function LogIn({ setLogin }) {
  return (
    <WrapperAll>
      <WrapperBody>
        <LoginComponent setLogin={setLogin} />
      </WrapperBody>
    </WrapperAll>
  );
}

export default LogIn;
