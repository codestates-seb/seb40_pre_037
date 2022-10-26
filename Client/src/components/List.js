import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  color: white;
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
              <div>
                <span>{`${post.id} votes`}</span>
                <span>{`${post.id} answers`}</span>
                <span>{`${post.id} views`}</span>
              </div>
              <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <div>
                  <div>linux, terminal, debian, gnome, ps1</div>
                  <span>{`${post.UserId}`}</span>
                </div>
              </div>
            </Li>
          ))}
        </Ul>
      </Section>
    </Container>
  );
}

export default List;
