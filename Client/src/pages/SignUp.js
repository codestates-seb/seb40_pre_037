import React from 'react';
import styled from 'styled-components';
import SignupComponent from '../components/SignupComponent';

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

function SignUp() {
  return (
    <WrapperAll>
      <WrapperBody>
        <SignupComponent />
      </WrapperBody>
    </WrapperAll>
  );
}

export default SignUp;
