import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';

const Container = styled.aside`
  width: 155px;
  margin-left: 10px;
  margin-top: 75px; // 추후 다른 컴포넌트와 합칠때 고려한 마진입니다.
`;

const TopBox = styled.div`
  padding: 10px 0px;
  h1 {
    font-size: 13px;
    line-height: 26px;
    color: #525960;
  }
`;

const MidBox = styled.div`
  margin: 20px 0px;
`;

const BotBox = styled.div``;

const WrapperTitle = styled.div`
  font-size: 11px;
  color: #61737c;
  line-height: 14.3846px;
  margin-bottom: 5px;
`;

const WrapperTab = styled.div`
  & > div {
    border: 1px solid rgb(235, 237, 239);
    width: 165px;
    height: 290px;
    margin-left: -10px;
    padding: 15px;
    span {
      font-size: 13px;
      line-height: 17px;
      color: #525960;
    }
    span:first-child {
      color: #2f3337;
      font-weight: bolder;
    }
  }
`;

const Ul = styled.ul`
  div {
    position: absolute;
    top: 168px;
    font-size: 13px;
  }
`;

const Li = styled.li`
  font-size: 13px;
  height: 26px;
  color: #0c0d0e;
  height: 35px;
  padding: 11.5px 22.5px;
  background-color: ${props =>
    props.location === '/' ? '#f1f2f3' : '#ffffff'};
`;

const Img = styled.img`
  width: 139px;
  height: 114px;
`;

const BtnCreateTeam = styled.a`
  display: block;
  width: 135px;
  height: 30px;
  background-color: #f48225;
  font-size: 11px;
  line-height: 12.7px;
  text-align: center;
  color: white;
  padding: 10px;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  font-weight: 600;
  &:hover {
    color: white;
  }
`;

const BtnWhyTeam = styled(BtnCreateTeam)`
  background-color: white;
  color: #6a737c;
  font-weight: 400;
  &:hover {
    color: #6a737c;
    background-color: #f8f9f9;
  }
`;

function AsideLeft() {
  const { pathname } = useLocation();

  return (
    <Container>
      <TopBox>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </TopBox>
      <MidBox>
        <WrapperTitle>
          <h1>PUBLIC</h1>
        </WrapperTitle>
        <WrapperTab>
          <Ul>
            <div dangerouslySetInnerHTML={{ __html: Icons.IconGlobe }} />
            <Link to="/">
              <Li location={pathname}>
                <span>Questions</span>
              </Li>
            </Link>
            <Li>Tags</Li>
          </Ul>
        </WrapperTab>
      </MidBox>
      <BotBox>
        <WrapperTitle>
          <h1>TEAMS</h1>
        </WrapperTitle>
        <WrapperTab>
          <div>
            <span>Stack Overflow for Teams </span>
            <span>
              - Start collaborating and sharing organizational knowledge.
            </span>
            <Img src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e" />
            <BtnCreateTeam href="https://try.stackoverflow.co/why-teams/?utm_source=so-owned&utm_medium=side-bar&utm_campaign=campaign-38&utm_content=cta">
              Create a free Team
            </BtnCreateTeam>
            <BtnWhyTeam href="https://stackoverflow.co/teams/">
              Why Teams?
            </BtnWhyTeam>
          </div>
        </WrapperTab>
      </BotBox>
    </Container>
  );
}

export default AsideLeft;
