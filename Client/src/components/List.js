import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const tags = ['linux', 'terminal', 'debian', 'gnome', 'ps1'];

const Container = styled.main`
  @media screen and (min-width: 1261px) {
    width: 750px;
  }
  @media screen and (max-width: 1260px) {
    width: 59.5vw;
  }
  margin-top: 50px;
  border-left: 1px solid rgb(219, 222, 224);
`;

const Section = styled.section`
  padding-left: 25px;
  padding-top: 25px;
  &:last-child {
    padding-left: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  &:first-child {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 27px;
  font-weight: 500;
  line-height: 35px;
`;

const NumOfArticle = styled.h2`
  font-size: 17px;
  line-height: 22px;
  color: #232629;
`;

const BtnWrite = styled.button`
  color: #ffffff;
  background-color: #0a95ff;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  &:hover {
    cursor: pointer;
    background-color: #0074cc;
  }
`;

const BtnSort = styled.button`
  font-size: 12px;
  padding: 10px;
  color: #6a737c;
  background-color: white;
  border: 1px solid rgb(140, 148, 156);
  &:hover {
    background-color: #f8f9f9;
    cursor: pointer;
  }
  &:first-child {
    color: #3b4045;
    background-color: #e3e6e8;
  }
`;

const Ul = styled.ul``;

const Li = styled.li`
  border-top: 1px solid rgb(219, 222, 224);
  padding: 20px;
  display: flex;
  width: 100%;
  gap: 15px;
`;

const SummaryLeft = styled.div`
  font-size: 13px;
  line-height: 17px;
  color: #6a737c;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    display: block;
    margin-bottom: 5px;
  }

  span:first-child {
    color: #0c0d0e;
  }
`;

const SummaryRight = styled.div`
  @media screen and (min-width: 1261px) {
    width: 610px;
  }
  @media screen and (max-width: 1260px) {
    width: 50.5vw;
  }
  p {
    margin: 5px 0;
    font-size: 13px;
    line-height: 17px;
    color: #3b4045;
  }
`;

const TitleArticle = styled.span`
  font-size: 17px;
  line-height: 22px;
  color: #0074cc;
`;

const WrapperBot = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WrapperBtn = styled.div`
  display: flex;
  gap: 5px;
`;

const BtnTag = styled.button`
  border: none;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  padding: 5px;
  color: #39739d;
  background-color: #e1ecf4;
  border-radius: 3px;
`;

const WrapperMeta = styled.div`
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: baseline;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  margin-right: 3px;
`;

const Author = styled.span`
  margin-right: 3px;
  color: #0074cc;
`;

const CreatedAt = styled.span`
  color: #525960;
`;

function List() {
  const [posts, setePosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get('https://koreanjson.com/posts');
    setePosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Container>
      <Section>
        <Wrapper>
          <Title>All Questions</Title>
          <BtnWrite>Ask Question</BtnWrite>
        </Wrapper>
        <Wrapper>
          <NumOfArticle>23,156,270 questions</NumOfArticle>
          <div>
            <BtnSort>Newest</BtnSort>
            <BtnSort>Views</BtnSort>
            <BtnSort>Votes</BtnSort>
          </div>
        </Wrapper>
      </Section>
      <Section>
        <Ul>
          {posts.slice(0, 30).map(post => (
            <Li key={post.id}>
              <SummaryLeft>
                <span>{`${post.id} votes`}</span>
                <span>{`${post.id} answers`}</span>
                <span>{`${post.id} views`}</span>
              </SummaryLeft>
              <SummaryRight>
                <Link to="/detail/:id">
                  <TitleArticle>{post.title}</TitleArticle>
                </Link>
                <p>
                  {post.content.length > 120
                    ? `${post.content.split('').slice(0, 120).join('')}...`
                    : post.content}
                </p>
                <WrapperBot>
                  <WrapperBtn>
                    {tags.map(tag => (
                      <BtnTag key={tag}>{tag}</BtnTag>
                    ))}
                  </WrapperBtn>
                  <WrapperMeta>
                    <Img src="https://www.gravatar.com/avatar/841736ed4d0f434dc144ae5399cd5d85?s=256&d=identicon&r=PG&f=1" />
                    <Link to="user/:id">
                      <Author>Thomas</Author>
                    </Link>
                    <CreatedAt>asked 12 mins ago</CreatedAt>
                  </WrapperMeta>
                </WrapperBot>
              </SummaryRight>
            </Li>
          ))}
        </Ul>
      </Section>
    </Container>
  );
}

export default List;
