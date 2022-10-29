/*
책임개발자 : 전은혜
최초생성일 : 2022.10.26
최근수정일 : 2022.10.27
개요 :
- 추후 수정
*/

import React from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';
import { useNavigate } from 'react-router-dom';

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

  const handleNewAnswer = () => {
    navigate('/write');
  };

  return (
    <DetailContainer>
      <QuestionContainer>
        <TitleWrapper className="s-page-title wrap">
          <Title className="s-page-title--text">
            <H1Container className="s-page-title--header">
              Possible typo in openwebbeans.properties in openejb-core.jar?
            </H1Container>
            <p className="s-page-title--description">
              <SubInfo>Asked today</SubInfo>
              <SubInfo>Modified today</SubInfo>
              <SubInfo>Viewed 6 times</SubInfo>
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
                    className="fc-black-200"
                    dangerouslySetInnerHTML={{ __html: Icons.IconArrowUpLg }}
                  />
                  <div>2</div>
                  <div
                    className="fc-black-200"
                    dangerouslySetInnerHTML={{ __html: Icons.IconArrowDownLg }}
                  />
                </ArrowContainer>
                <TextAreaContainer>
                  <TextContainer className="s-textarea__m">
                    With react-router I can use the Link element to create links
                    which are natively handled by react router. I see internally
                    it calls this.context.transitionTo(...). I want to do a
                    navigation. Not from a link, but from a dropdown selection
                    (as an example). How can I do this in code? What is
                    this.context? I saw the Navigation mixin, but can I do this
                    without mixins?
                  </TextContainer>
                  <TagContainer>
                    <Tags className="d-flex g4">
                      <div className="s-tag">jquery</div>
                      <div className="s-tag">javascript</div>
                      <div className="s-tag">android</div>
                      <div className="s-tag is-selected">razor</div>
                    </Tags>
                  </TagContainer>
                </TextAreaContainer>
              </TextWrapper>
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
            </ArticleWrapper>
            <AnswerContainer>
              <H2 className="answers-subheader d-flex ai-center mb8">
                2 Answers
              </H2>
              <ContentContainer>
                <ArticleWrapper>
                  <TextWrapper>
                    <ArrowContainer>
                      <div
                        className="fc-black-200"
                        dangerouslySetInnerHTML={{
                          __html: Icons.IconArrowUpLg,
                        }}
                      />
                      <div>1</div>
                      <div
                        className="fc-black-200"
                        dangerouslySetInnerHTML={{
                          __html: Icons.IconArrowDownLg,
                        }}
                      />
                    </ArrowContainer>
                    <TextAreaContainer>
                      <TextContainer className="s-textarea__m">
                        {`React Router is mostly a wrapper around the history library.
              history handles interaction with the browser's window.history for
              you with its browser and hash histories. It also provides a memory
              history which is useful for environments that don't have a global
              history. This is particularly useful in mobile app development
              (react-native) and unit testing with Node.`}
                      </TextContainer>
                    </TextAreaContainer>
                  </TextWrapper>
                </ArticleWrapper>
              </ContentContainer>
              <NameSpace>
                <div className="s-user-card">
                  <time className="s-user-card--time">1 minutes ago</time>
                  <div className="s-avatar s-avatar__32 s-user-card--avatar">
                    <img className="s-avatar--image" alt="dk" src="…" />
                  </div>
                  <div className="s-user-card--info">
                    <span className="s-user-card--link">Paul Sight</span>
                  </div>
                </div>
              </NameSpace>
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
