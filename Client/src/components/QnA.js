/*
책임개발자 : 전은혜
최초생성일 : 2022.10.26
최근수정일 : 2022.11.03
*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';

import AsideRight from './AsideRight';
import TextEditor from './TextEditor';

const DetailContainer = styled.div`
  max-width: 1100px;
  padding: 24px 16px;
  margin-left: 165px;
  margin-top: 50px;
`;

const QuestionContainer = styled.div``;

const AnswerContainer = styled.div`
  padding: 24px 0;
  border-top: 1px solid hsl(210, 8%, 90%);
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  .wrap {
    flex-direction: row;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
`;

const H1Container = styled.h1`
  font-size: 27px;
`;

const SubInfo = styled.span`
  font-size: 13px;
  margin-right: 16px;
`;

const ButtonWrapper = styled.div`
  padding: 10px 0 15px 0;
`;

const Button = styled.button`
  margin-left: 12px;
  width: ${props => props.width};
  height: 40px;
  font-size: 13px;
  line-height: 15px;
  background-color: var(--blue-500);
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 68%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 22.5px;
`;

const TagContainer = styled.div`
  margin-bottom: 18px;
`;

const Tags = styled.div`
  margin-bottom: 13px;
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;

const NameSpace = styled.div`
  display: flex;
  justify-content: flex-end;
  .s-user-card {
    width: 200px;
    height: 70px;
  }
  .s-user-card--link {
    color: #0074cc;
  }
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 1.4rem;
  margin: 0 0 1em;
  line-height: 1.3;
`;

const MarginWrapper = styled.div`
  margin-top: -75px;
`;

const FunctionContainer = styled.div`
  color: gray;
  display: flex;
  flex-direction: row;
  & div {
    margin-right: 10px;
  }
`;

export default function Details() {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [answer, setAnswer] = useState();
  const [postInfo, setPostInfo] = useState({});
  const [update, setUpdate] = useState(true);
  const [value, setValue] = useState('');
  const [sendAnswer, setSendAnswer] = useState(false);
  const [ansIds, setAnsIds] = useState();
  const token = localStorage.getItem('login-token');
  const urlParams = new URL(window.location.href).searchParams;
  const detailId = urlParams.get('postId');

  const handleNewAnswer = () => {
    navigate('/write');
  };

  const getQuestion = id => {
    const header = {
      headers: {
        'ngrok-skip-browser-warning': '111',
      },
    };
    return axios
      .get(`/api/post/${id}`, header)
      .then(res => {
        setPost(res.data);
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAnswer = id => {
    const header = {
      headers: {
        'ngrok-skip-browser-warning': '111',
      },
    };
    return axios
      .get(`/api/answers/${id}`, header)
      .then(res => {
        setAnswer(res.data);
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAnsId = res => {
    const ids = res.map(el => el.answerId);
    return ids;
  };

  const countUpQ = id => {
    const header = {
      headers: { authorization: `${token}` },
    };
    axios.post(`/api/post/like/up/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  const countDownQ = id => {
    const header = {
      headers: { authorization: token },
    };
    axios.post(`/api/post/like/down/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  const countUpA = id => {
    const header = {
      headers: { authorization: token },
    };
    axios.post(`/api/answers/like/up/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  const countDownA = id => {
    const header = {
      headers: { authorization: token },
    };
    axios.post(`/api/answers/like/down/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  const postAnswer = () => {
    const header = {
      headers: { authorization: token },
    };
    if (sendAnswer) {
      axios
        .post(`/api/answers`, { postId: +detailId, answerBody: value }, header)
        .catch(error => {
          console.log(error);
        });
      setUpdate(true);
    }
  };

  const deleteQuestion = () => {
    const header = {
      headers: { authorization: token },
    };
    axios.delete(`/api/post/${detailId}`, header).catch(e => console.log(e));
    setUpdate(true);
    navigate('/');
  };

  const editQuestion = () => {
    navigate(`/write/?postId=${detailId}`);
  };

  const callFunction = () => {
    if (token) {
      const decode = jwt(token.split(' ')[1]);
      if (decode.nickname !== post.memberName) {
        return '';
      }
      return (
        <FunctionContainer>
          <div
            role="presentation"
            type="button"
            onClick={editQuestion}
            className="s-menu"
          >
            edit
          </div>
          <div
            role="presentation"
            type="button"
            onClick={deleteQuestion}
            className="s-menu"
          >
            delete
          </div>
        </FunctionContainer>
      );
    }
    return '';
  };

  const getTime = res => {
    const last = new Date(res);
    const now = new Date();
    let year = now.getFullYear() - last.getFullYear();
    let month = now.getMonth() + 1 - (last.getMonth() + 1);
    let day = now.getDate() - last.getDate();
    if (day < 0) {
      day += [1, 3, 5, 7, 8, 10, 12].includes(month)
        ? 31
        : month === 2
        ? 28
        : 30;
      month -= 1;
    }
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    return `${year === 0 ? '' : `${year} years`} ${
      month === 0 ? '' : `${month} months`
    } ${day === 0 ? 'today' : `${day} days`}`;
  };

  useEffect(() => {
    if (update) {
      getQuestion(detailId).then(res => {
        const ask = getTime(res.createdAt);
        const mod = getTime(res.lastModifiedDate);
        setPostInfo({ ...postInfo, ask, mod });
      });
      getAnswer(detailId).then(res => setAnsIds(getAnsId(res)));
      setUpdate(false);
    }
  }, [update]);

  return (
    <DetailContainer>
      <QuestionContainer>
        <TitleWrapper className="s-page-title wrap">
          <Title className="s-page-title--text">
            <H1Container className="s-page-title--header">
              {post && post.title}
            </H1Container>
            <p className="s-page-title--description">
              <SubInfo>Asked {postInfo.ask}</SubInfo>
              <SubInfo>Modified {postInfo.mod}</SubInfo>
              <SubInfo>Viewed {post && post.viewCount} times</SubInfo>
            </p>
          </Title>
          <ButtonWrapper>
            <Button
              className="s-btn s-btn__primary"
              width="115px"
              type="button"
              onClick={handleNewAnswer}
            >
              Ask Question
            </Button>
          </ButtonWrapper>
        </TitleWrapper>
        <SideWrapper>
          <ContentContainer>
            <ArticleWrapper>
              <TextWrapper>
                <ArrowContainer>
                  <div
                    role="presentation"
                    className="fc-black-200"
                    onClick={() => countUpQ(detailId)}
                    dangerouslySetInnerHTML={{ __html: Icons.IconArrowUpLg }}
                  />
                  <div>{post ? post.likeCount : ''}</div>
                  <div
                    role="presentation"
                    onClick={() => countDownQ(detailId)}
                    className="fc-black-200"
                    dangerouslySetInnerHTML={{ __html: Icons.IconArrowDownLg }}
                  />
                </ArrowContainer>
                <TextAreaContainer>
                  <TextContainer className="s-textarea__m">
                    {post ? (
                      <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    ) : (
                      <div />
                    )}
                  </TextContainer>
                  <TagContainer>
                    <Tags className="d-flex g4">
                      {post ? (
                        post.tags.map(el => {
                          return (
                            <div key={el} className="s-tag">
                              {el}
                            </div>
                          );
                        })
                      ) : (
                        <div />
                      )}
                      {/* <div className="s-tag is-selected">razor</div> */}
                    </Tags>
                  </TagContainer>
                  {post && callFunction()}
                </TextAreaContainer>
              </TextWrapper>
              <NameSpace>
                <div className="s-user-card s-user-card__highlighted">
                  <time className="s-user-card--time">
                    asked{' '}
                    {post ? new Date(post.createdAt).toLocaleDateString() : ''}
                  </time>
                  <div className="s-avatar s-avatar__32 s-user-card--avatar">
                    <img
                      className="s-avatar--image"
                      alt="profile"
                      src="https://www.gravatar.com/avatar/841736ed4d0f434dc144ae5399cd5d85?s=256&d=identicon&r=PG&f=1"
                    />
                  </div>
                  <div className="s-user-card--info">
                    <span className="s-user-card--link">
                      {post && post.memberName}
                    </span>
                  </div>
                </div>
              </NameSpace>
            </ArticleWrapper>

            <AnswerContainer>
              <H2 className="answers-subheader d-flex ai-center mb8">
                {post && post.answerCount} Answers
              </H2>
              {answer ? (
                answer.map((el, idx) => {
                  return (
                    <div key={el.answerId}>
                      <ContentContainer>
                        <ArticleWrapper>
                          <TextWrapper>
                            <ArrowContainer>
                              <div
                                role="presentation"
                                onClick={() => countUpA(ansIds[idx])}
                                className="fc-black-200"
                                dangerouslySetInnerHTML={{
                                  __html: Icons.IconArrowUpLg,
                                }}
                              />
                              <div>{el.likeCount}</div>
                              <div
                                role="presentation"
                                onClick={() => countDownA(ansIds[idx])}
                                className="fc-black-200"
                                dangerouslySetInnerHTML={{
                                  __html: Icons.IconArrowDownLg,
                                }}
                              />
                            </ArrowContainer>
                            <TextAreaContainer>
                              <TextContainer className="s-textarea__m">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: el.answerBody,
                                  }}
                                />
                              </TextContainer>
                            </TextAreaContainer>
                          </TextWrapper>
                        </ArticleWrapper>
                      </ContentContainer>
                      <NameSpace>
                        <div className="s-user-card">
                          <time className="s-user-card--time">
                            answered{' '}
                            {new Date(el.createdAt).toLocaleDateString()}
                          </time>
                          <div className="s-avatar s-avatar__32 s-user-card--avatar">
                            <img
                              className="s-avatar--image"
                              alt="profile"
                              src="https://www.gravatar.com/avatar/841736ed4d0f434dc144ae5399cd5d85?s=256&d=identicon&r=PG&f=1"
                            />
                          </div>
                          <div className="s-user-card--info">
                            <span className="s-user-card--link">
                              {el.memberName}
                            </span>
                          </div>
                        </div>
                      </NameSpace>
                    </div>
                  );
                })
              ) : (
                <div />
              )}
            </AnswerContainer>
            <H2 className="space">Your Answer</H2>
            <TextEditor setValue={setValue} setSendAnswer={setSendAnswer} />
            <ButtonWrapper className="clear-both d-flex gsx gs4">
              <Button
                className="s-btn s-btn__primary"
                disabled={!sendAnswer}
                type="button"
                onClick={postAnswer}
              >
                Post Your Answer
              </Button>
            </ButtonWrapper>
          </ContentContainer>
          <MarginWrapper>
            <AsideRight />
          </MarginWrapper>
        </SideWrapper>
      </QuestionContainer>
    </DetailContainer>
  );
}
