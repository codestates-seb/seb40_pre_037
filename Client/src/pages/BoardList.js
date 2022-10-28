import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import AsideLeft from '../components/AsideLeft';
import List from '../components/List';
import AsideRight from '../components/AsideRight';
import Footer from '../components/Footer';

const WrapperAll = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -50px;
`;

const WrapperNav = styled.div`
  height: 55px;
`;

const WrapperBody = styled.div`
  margin: 0 auto;
`;

const WrapperMain = styled.div`
  display: flex;
  margin-left: 165px;
`;

const WrapperFooter = styled.div``;

function BoardList() {
  return (
    <WrapperAll>
      <WrapperNav>
        <Nav />
      </WrapperNav>
      <WrapperBody>
        <AsideLeft />
        <WrapperMain>
          <List />
          <AsideRight />
        </WrapperMain>
      </WrapperBody>
      <WrapperFooter>
        <Footer />
      </WrapperFooter>
    </WrapperAll>
  );
}

export default BoardList;
