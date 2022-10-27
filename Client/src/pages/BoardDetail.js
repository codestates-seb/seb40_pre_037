import React from 'react';
import styled from 'styled-components';
import Details from '../components/Detail';
import Nav from '../components/Nav';
import AsideLeft from '../components/AsideLeft';

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
`;

function BoardDetail() {
  return (
    <Main>
      <Nav />
      <Section>
        <AsideLeft />
        <Details />
      </Section>
    </Main>
  );
}

export default BoardDetail;
