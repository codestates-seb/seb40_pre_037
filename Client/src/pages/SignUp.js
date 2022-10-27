import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import SignupComponent from '../components/SignupComponent';

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

function SignUp() {
  return (
    <WrapperAll>
      <WrapperNav>
        <Nav />
      </WrapperNav>
      <WrapperBody>
        <SignupComponent />
      </WrapperBody>
    </WrapperAll>
  );
}

export default SignUp;
