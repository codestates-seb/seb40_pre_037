/*
책임개발자 : 전은혜
최초생성일 : 2022.10.26
최근수정일 : 2022.10.27
개요 :
- 추후 수정
*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default function Details() {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [answer, setAnswer] = useState();
  const [postInfo, setPostInfo] = useState({});
  const [update, setUpdate] = useState(false);
  const token = localStorage.getItem('login-token');
  const detailId = 1;

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
      .get(`/post/${id}`, header)
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
      .get(`/answers/${id}`, header)
      .then(res => {
        setAnswer(res.data);
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const countUpQ = id => {
    const header = {
      headers: { authorization: `${token}` },
    };
    axios.post(`/post/like/up/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };
  const countDownQ = id => {
    const header = {
      headers: { authorization: token },
    };
    axios.post(`/post/like/down/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  const countUpA = id => {
    const header = {
      headers: { authorization: `${token}` },
    };
    axios.post(`/answers/like/up/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };
  const countDownA = id => {
    const header = {
      headers: { authorization: token },
    };
    axios.post(`/answers/like/down/${id}`, {}, header).catch(error => {
      console.log(error);
    });
    setUpdate(true);
  };

  useEffect(() => {
    if (update) {
      getQuestion(detailId).then(res => {
        const last = new Date(res.createdAt);
        const now = new Date();
        const year = now.getFullYear() - last.getFullYear();
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
        const ask = `${year === 0 ? '' : `${year} years`} ${
          month === 0 ? '' : `${month} months`
        } ${day === 0 ? 'today' : `${day} days`}`;
        setPostInfo({ ...postInfo, ask, mod: 0 });
      });
      getAnswer(detailId);

      setUpdate(false);
    }
  }, [update]);

  return (
    <DetailContainer>
      <QuestionContainer>
        <TitleWrapper className="s-page-title wrap">
          <Title className="s-page-title--text">
            <H1Container className="s-page-title--header">
              {post ? post.title : ''}
            </H1Container>
            <p className="s-page-title--description">
              <SubInfo>Asked {postInfo.ask}</SubInfo>
              <SubInfo>Modified {postInfo.mod}</SubInfo>
              <SubInfo>Viewed {post ? post.viewCount : '0'} times</SubInfo>
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
                </TextAreaContainer>
              </TextWrapper>
              <NameSpace>
                <div className="s-user-card s-user-card__highlighted">
                  <time className="s-user-card--time">
                    asked{' '}
                    {post ? new Date(post.createdAt).toLocaleDateString() : ''}
                  </time>
                  <div className="s-avatar s-avatar__32 s-user-card--avatar">
                    <img className="s-avatar--image" alt="dk" src="…" />
                  </div>
                  <div className="s-user-card--info">
                    <span className="s-user-card--link">
                      {post ? post.memberName : ''}
                    </span>
                  </div>
                </div>
              </NameSpace>
            </ArticleWrapper>

            <AnswerContainer>
              <H2 className="answers-subheader d-flex ai-center mb8">
                {post ? post.answerCount : 0} Answers
              </H2>
              {answer ? (
                answer.map(el => {
                  return (
                    <div key={el.answerId}>
                      <ContentContainer>
                        <ArticleWrapper>
                          <TextWrapper>
                            <ArrowContainer>
                              <div
                                role="presentation"
                                onClick={() => countUpA(el.answerId)}
                                className="fc-black-200"
                                dangerouslySetInnerHTML={{
                                  __html: Icons.IconArrowUpLg,
                                }}
                              />
                              <div>{el.likeCount}</div>
                              <div
                                role="presentation"
                                onClick={() => countDownA(el.answerId)}
                                className="fc-black-200"
                                dangerouslySetInnerHTML={{
                                  __html: Icons.IconArrowDownLg,
                                }}
                              />
                            </ArrowContainer>
                            <TextAreaContainer>
                              <TextContainer className="s-textarea__m">
                                {el.answerBody}
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
                            <img className="s-avatar--image" alt="dk" src="…" />
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
            <TextEditor />
            <ButtonWrapper className="clear-both d-flex gsx gs4">
              <Button className="s-btn s-btn__primary" type="button">
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
