import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import AsideLeft from '../components/AsideLeft';
import List from '../components/List';
import AsideRight from '../components/AsideRight';

const WrapperAll = styled.div`
  display: flex;
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
    </WrapperAll>
  );
}

export default BoardList;
