import React from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';

import AsideRight from './AsideRight';

const DetailContainer = styled.div`
  padding: 24px 16px;
  margin-left: 165px;
  margin-top: 50px;
`;

const QuestionContainer = styled.div`
  border-bottom: 1px solid hsl(210, 8%, 90%);
`;

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
  word-break: break-all;
`;

const H1Container = styled.h1`
  font-size: 27px;
`;

const SubInfo = styled.span`
  font-size: 13px;
  margin-right: 16px;
`;

const ButtonWrapper = styled.div``;

const Button = styled.button`
  margin-left: 12px;
  width: 115px;
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

export default function Details() {
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
            <Button className="s-btn s-btn__primary" type="button">
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
          </ContentContainer>
          <AsideRight />
        </SideWrapper>
      </QuestionContainer>
    </DetailContainer>
  );
}
