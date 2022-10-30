/*
책임개발자 : 최유정
최초생성일 : 2022.10.27
최근수정일 : 2022.10.28
개요 :
- components 경로 수정
- 가로스크롤 방지로 UI 개선
*/

import React from 'react';
import styled from 'styled-components';
import Ask from '../components/Ask';
import Footer from '../components/Footer';

const WriteContainer = styled.div`
  overflow-x: hidden;
`;

function BoardWrite() {
  return (
    <WriteContainer>
      <Ask />
      <Footer />
    </WriteContainer>
  );
}

export default BoardWrite;
