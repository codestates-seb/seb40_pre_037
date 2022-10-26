import React from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';

const Title = styled.div`
  display: flex;
  flex-direction: row;
`;

const H1Container = styled.div`
  width: 80%;
`;

const NameSpace = styled.div`
  width: 150px;
  .s-user-card--link {
    color: #0074cc;
  }
`;

export default function Details() {
  console.log(Icons.IconArrowUpLg);
  return (
    <>
      <Title>
        <H1Container className="s-page-title">
          <h1 className="s-page-title--header">
            Possible typo in openwebbeans.properties in openejb-core.jar?
          </h1>
        </H1Container>
      </Title>
      <button className="s-btn s-btn__primary" type="button">
        Ask Question
      </button>
      <div>
        <span>Asked today</span>
        <span>Modified today</span>
        <span>Viewed 6 times</span>
      </div>
      <div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: Icons.IconArrowUpLg }} />
          <div dangerouslySetInnerHTML={{ __html: Icons.IconArrowDownLg }} />
        </div>
        <NameSpace>
          <div className="s-user-card s-user-card__highlighted">
            <time className="s-user-card--time">3 minutes ago</time>
            <div className="s-avatar s-avatar__32 s-user-card--avatar">
              <img className="s-avatar--image" alt="dk" src="…" />
            </div>
            <div className="s-user-card--info">
              <span className="s-user-card--link">Paul Sight</span>
            </div>
          </div>
        </NameSpace>
      </div>
    </>
  );
}
