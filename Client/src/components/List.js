import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import {
  curPageAtom,
  pagesAtom,
  postsAtom,
  sortByAtom,
  timeNowAtom,
  totalPagesAtom,
  totalQuestionsAtom,
} from '../atoms';

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
  border: 1px solid rgb(140, 148, 156);
  color: ${props => (props.sortBy ? '#3b4045' : '#61737c')};
  background-color: ${props => (props.sortBy ? '#e3e6e8' : 'white')};
  &:hover {
    background-color: #f8f9f9;
    cursor: pointer;
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

const Pagenation = styled.div`
  width: 100%;
  height: 145px;
  border-top: 1px solid rgb(219, 222, 224);
`;

const WrapperBtnPage = styled.div`
  display: flex;
  gap: 5px;
  padding-top: 75px;
  padding-left: 30px;
  align-items: baseline;
  height: 30px;

  span {
    margin: 0 10px;
    line-height: 25px;
    font-size: 13px;
    color: #232529;
  }
`;

const BtnPage = styled.button`
  padding: 0px 8px;
  font-size: 12px;
  height: 30px;
  min-width: 30px;
  border: 1px solid rgb(226, 228, 230);
  color: ${props => (props.curPage ? '#fef5ef' : '#3b3035')};
  background-color: ${props => (props.curPage ? '#f48224' : 'white')};

  &:hover {
    color: ${props => (props.curPage ? '#fef5ef' : '#0c0d0e')};
    background-color: ${props => (props.curPage ? '#f48224' : '#d9d6dc')};
    cursor: pointer;
  }

  &:first-child {
    margin-right: 20px;
  }

  &:last-child {
    margin-left: 20px;
  }
`;

function List() {
  const [posts, setePosts] = useRecoilState(postsAtom);
  const [pages, setPages] = useRecoilState(pagesAtom);
  const [curPage, setCurPage] = useRecoilState(curPageAtom);
  const [sortBy, setSortBy] = useRecoilState(sortByAtom);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesAtom);
  const [totalQuestions, setTotalQuestions] =
    useRecoilState(totalQuestionsAtom);
  const [timeNow, setTimeNow] = useRecoilState(timeNowAtom);

  const navigate = useNavigate();

  const howManyTimesAgo = createdAtUTC => {
    const createdAt = Date.parse(createdAtUTC);
    const diffSeconds = Math.round((timeNow - createdAt) / 1000);

    if (diffSeconds < 60) {
      if (diffSeconds === 1) return '1 sec ago';
      return `${diffSeconds} secs ago`;
    }

    const diffMinutes = Math.round(diffSeconds / 60);

    if (diffMinutes < 60) {
      if (diffMinutes === 1) return '1 sec ago';
      return `${diffMinutes} mins ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);

    if (diffHours < 24) {
      if (diffHours === 1) return '1 hour ago';
      return `${diffHours} hours ago`;
    }

    const diffDays = Math.round(diffHours / 24);

    if (diffDays < 3) {
      if (diffDays === 1) return 'yesterday';
      return '2 days ago';
    }

    const dateCreatedAt = new Date(createdAt);

    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${
      month[dateCreatedAt.getMonth()]
    } ${dateCreatedAt.getDate()}, ${dateCreatedAt.getFullYear()} at ${dateCreatedAt.getHours()}:${dateCreatedAt.getMinutes()}`;
  };

  const { isInitialLoading } = useQuery(
    ['post', `${curPage}`, `${sortBy}`],
    () => axios.get(`/post/${sortBy}?page=${curPage}&size=10`),
    {
      onSuccess: response => {
        setePosts(response.data.data);
        setTotalPages(response.data.pageInfo.totalPages);
        setTotalQuestions(response.data.pageInfo.totalElements);
        setTimeNow(Date.now());
      },
    },
  );
  // console.log(response.data.data);

  const getPages = () => {
    const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
    setPages(arr);
  };

  const navigator = () => {
    navigate(`?sortBy=${sortBy}&page=${curPage}`);
  };

  const onClickPage = event => {
    event.preventDefault();
    setCurPage(+event.target.innerText);
  };

  const onClickPrev = event => {
    event.preventDefault();
    setCurPage(prev => prev - 1);
  };

  const onClickNext = event => {
    event.preventDefault();
    setCurPage(prev => prev + 1);
  };

  const onClickNewest = event => {
    event.preventDefault();
    setSortBy('present');
  };

  const onClickViews = event => {
    event.preventDefault();
    setSortBy('view');
  };

  const onClickVotes = event => {
    event.preventDefault();
    setSortBy('like');
  };

  /* useEffect(() => {
    fetchPosts();
  }, [curPage, sortBy]); */

  useEffect(() => {
    getPages();
  }, [posts]);

  useEffect(() => {
    navigator();
  }, [sortBy, curPage]);

  // console.log(timeNow);
  return (
    <Container>
      {isInitialLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Section>
            <Wrapper>
              <Title>All Questions</Title>
              <Link to="/write">
                <BtnWrite>Ask Question</BtnWrite>
              </Link>
            </Wrapper>
            <Wrapper>
              <NumOfArticle>{`${totalQuestions} questions`}</NumOfArticle>
              <div>
                <BtnSort sortBy={sortBy === 'present'} onClick={onClickNewest}>
                  Newest
                </BtnSort>
                <BtnSort sortBy={sortBy === 'view'} onClick={onClickViews}>
                  Views
                </BtnSort>
                <BtnSort sortBy={sortBy === 'like'} onClick={onClickVotes}>
                  Votes
                </BtnSort>
              </div>
            </Wrapper>
          </Section>
          <Section>
            <Ul>
              {posts &&
                posts.map(post => (
                  <Li key={post.postId}>
                    <SummaryLeft>
                      <span>{`${post.likeCount} votes`}</span>
                      <span>{`${post.answerCount && '0'} answers`}</span>
                      <span>{`${post.viewCount} views`}</span>
                    </SummaryLeft>
                    <SummaryRight>
                      <Link to={`/detail?postId=${post.postId}`}>
                        <TitleArticle>{post.title}</TitleArticle>
                      </Link>
                      <p>
                        {/* post.content.length > 120
                    ? `${post.content.split('').slice(0, 120).join('')}...`
          : post.content */}
                        {post.body.replace(/(<([^>]+)>)/gi, '')}
                      </p>
                      <WrapperBot>
                        <WrapperBtn>
                          {post.tags.map(tag => (
                            <BtnTag key={tag}>{tag}</BtnTag>
                          ))}
                        </WrapperBtn>
                        <WrapperMeta>
                          <Img src="https://www.gravatar.com/avatar/841736ed4d0f434dc144ae5399cd5d85?s=256&d=identicon&r=PG&f=1" />
                          <Author>{post.memberName}</Author>
                          <CreatedAt>{`asked ${howManyTimesAgo(
                            post.createdAt,
                          )}`}</CreatedAt>
                        </WrapperMeta>
                      </WrapperBot>
                    </SummaryRight>
                  </Li>
                ))}
            </Ul>
            <Pagenation>
              <WrapperBtnPage>
                <BtnPage onClick={onClickPrev}>Prev</BtnPage>
                {pages.slice(-5).map(pageNum => (
                  <BtnPage
                    curPage={curPage === pageNum}
                    key={pageNum}
                    onClick={onClickPage}
                  >
                    {pageNum}
                  </BtnPage>
                ))}
                <BtnPage onClick={onClickNext}>Next</BtnPage>
              </WrapperBtnPage>
            </Pagenation>
          </Section>
        </>
      )}
    </Container>
  );
}

export default List;
