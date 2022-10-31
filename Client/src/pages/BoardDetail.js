import React from 'react';
import styled from 'styled-components';
import Details from '../components/QnA';
import AsideLeft from '../components/AsideLeft';
import Footer from '../components/Footer';

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
      <Section>
        <AsideLeft />
        <Details />
      </Section>
      <Footer />
    </Main>
  );
}

export default BoardDetail;
