import React from 'react';
import styled from 'styled-components';
import Details from '../components/QnA';
import Nav from '../components/Nav';
import AsideLeft from '../components/AsideLeft';

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
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
