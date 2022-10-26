import React from 'react';
import styled from 'styled-components';
import * as Icons from '@stackoverflow/stacks-icons';

const Container = styled.aside`
  width: 300px;
  background-color: rgb(251, 243, 213);
  color: rgb(97, 103, 106);
  margin-top: 20px; // 추후 다른 컴포넌트와 합칠때 고려한 마진입니다.
  margin-left: 20px; // 추후 다른 컴포넌트와 합칠때 고려한 마진입니다.
`;

const WrapperOdd = styled.div`
  padding: 15px;
  border: 1px solid rgb(242, 231, 191);
  font-size: 12px;
  font-weight: 900;
`;

const WrapperEven = styled.div`
  padding: 15px 15px 0px 15px;
  font-weight: 600;
  background-color: rgb(253, 247, 226);
  font-size: 13px;
`;

const Ul = styled.ul``;

const Li = styled.li`
  font-size: 13px;
  padding-bottom: 15px;
  display: flex;
  gap: 10px;
  align-items: baseline;
`;

const A = styled.a`
  line-height: 17px;
  text-decoration: none;
  color: rgb(97, 103, 106);

  &:hover {
    color: rgb(97, 103, 106);
  }
`;

function AsideRight() {
  return (
    <Container>
      <WrapperOdd>The Overflow Blog</WrapperOdd>
      <WrapperEven>
        <Ul>
          <Li>
            <div dangerouslySetInnerHTML={{ __html: Icons.IconPencilSm }} />
            <A href="https://stackoverflow.blog/2022/10/24/how-hardware-and-software-can-maximize-your-flow-states/?cb=1&_ga=2.11990900.177893255.1666422118-1796553269.1658678422">
              How hardware and software can maximize your flow states
            </A>
          </Li>
          <Li>
            <div dangerouslySetInnerHTML={{ __html: Icons.IconPencilSm }} />
            <A href="https://stackoverflow.blog/2022/10/25/a-flight-simulator-for-developers-to-practice-real-world-challenges-and-surprises-ep-500/?cb=1&_ga=2.221764440.177893255.1666422118-1796553269.1658678422">
              A flight simulator for developers to practice real world
              challenges and...
            </A>
          </Li>
        </Ul>
      </WrapperEven>
      <WrapperOdd>Featured on Meta</WrapperOdd>
      <WrapperEven>
        <Ul>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconSpeechBubbleRightSm,
              }}
              className="fc-blue-300"
            />
            <A href="https://meta.stackexchange.com/questions/383022/the-2022-community-a-thon-has-begun?cb=1">
              The 2022 Community-a-thon has begun!
            </A>
          </Li>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconSpeechBubbleRightSm,
              }}
              className="fc-blue-300"
            />
            <A href="https://meta.stackexchange.com/questions/383026/mobile-app-infrastructure-being-decommissioned?cb=1">
              Mobile app infrastructure being decommissioned
            </A>
          </Li>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconLogoGlyphXxs,
              }}
            />
            <A href="https://meta.stackoverflow.com/questions/420897/staging-ground-workflow-canned-comments?cb=1">
              Staging Ground Workflow: Canned Comments
            </A>
          </Li>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconLogoGlyphXxs,
              }}
            />
            <A href="https://meta.stackoverflow.com/questions/406928/the-script-tag-is-being-burninated?cb=1">
              The [script] tag is being burninated
            </A>
          </Li>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconLogoGlyphXxs,
              }}
            />
            <A href="https://meta.stackoverflow.com/questions/421038/the-ask-wizard-2022-has-graduated?cb=1">
              The Ask Wizard Test Graduation
            </A>
          </Li>
        </Ul>
      </WrapperEven>
      <WrapperOdd>Hot Meta Posts</WrapperOdd>
      <WrapperEven>
        <Ul>
          <Li>
            <div
              dangerouslySetInnerHTML={{
                __html: Icons.IconLogoGlyphXxs,
              }}
            />
            <A href="https://meta.stackoverflow.com/questions/421006/burninate-self-hosting?cb=1">
              Burninate [self-hosting]
            </A>
          </Li>
        </Ul>
      </WrapperEven>
    </Container>
  );
}

export default AsideRight;
