import React from 'react';
import styled from 'styled-components';

const FooterBackground = styled.div`
  background-color: #232629;
  width: 100vw;
  /* margin: 0 auto;
  padding: 32px 12px; */
`;
const FooterContainer = styled.div`
  background-color: #232629;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 0px;
`;

const TitleLink = styled.a`
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 12px;
`;

const SubLink = styled.a`
  height: 25px;
  clear: both;
`;

const ShareLink = styled.a`
  font-size: 11px;
  clear: both;
  float: left;
`;

const DesignDiv = styled.div`
  font-size: 11px;
`;

const firstArr = ['STACK OVERFLOW', 'Questions', 'Help'];
const secondArr = ['PRODUCTS', 'Teams', 'Advertising', 'Collectives', 'Talent'];
const thirdArr = [
  'COMPANY',
  'About',
  'Press',
  'Work Here',
  'Legal',
  'Privacy Policy',
  'Terms of Service',
  'Contact Us',
  'Cookie Settings',
  'Cookie Policy',
];
const fourthArr = [
  'STACK EXCHANGE NETWORK',
  'Technology',
  'Culture & recreation',
  'Life & arts',
  'Science',
  'Professional',
  'Business',
];
// const fourthBottomArr = ['API', 'DATA'];

const fifthArr = ['Blog', 'Facebook', 'Twitter', 'Linkedin', 'Instagram'];

const stackUrl = 'https://stackoverflow.com/';

function Footer() {
  return (
    <FooterBackground>
      <FooterContainer className="d-flex fd-row">
        <div className="flex--item d-flex fd-row pr32">
          <svg
            aria-hidden="true"
            className="svg-icon flex--item native iconLogoGlyphMd"
            width="32"
            height="37"
            viewBox="0 0 32 37"
          >
            <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
            <path
              d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
              fill="#F48024"
            />
          </svg>
        </div>
        <div className="d-flex fd-row jc-space-between fl-grow1">
          <div className="flex--item d-flex fd-column m4">
            {firstArr.map((el, idx) =>
              idx === 0 ? (
                <TitleLink
                  key={el}
                  className="s-link s-link__muted fc-black-200"
                  href={stackUrl}
                >
                  {el}
                </TitleLink>
              ) : (
                <SubLink
                  key={el}
                  className="s-link s-link__muted flex--item fc-black-400 "
                  href={el === 'Questions' ? '/' : stackUrl}
                >
                  {el}
                </SubLink>
              ),
            )}
          </div>
          <div className="flex--item d-flex fd-column m4">
            {secondArr.map((el, idx) =>
              idx === 0 ? (
                <TitleLink
                  key={el}
                  className="s-link s-link__muted fc-black-200"
                  href={stackUrl}
                >
                  {el}
                </TitleLink>
              ) : (
                <SubLink
                  key={el}
                  className="s-link s-link__muted flex--item fc-black-400"
                  href={stackUrl}
                >
                  {el}
                </SubLink>
              ),
            )}
          </div>
          <div className="flex--item d-flex fd-column m4">
            {thirdArr.map((el, idx) =>
              idx === 0 ? (
                <TitleLink
                  key={el}
                  className="s-link s-link__muted fc-black-200"
                  href={stackUrl}
                >
                  {el}
                </TitleLink>
              ) : (
                <SubLink
                  key={el}
                  className="s-link s-link__muted flex--item fc-black-400"
                  href={stackUrl}
                >
                  {el}
                </SubLink>
              ),
            )}
          </div>
          <div className="flex--item d-flex fd-column m4">
            {fourthArr.map((el, idx) =>
              idx === 0 ? (
                <TitleLink
                  key={el}
                  className="s-link s-link__muted fc-black-200 "
                  href={stackUrl}
                >
                  {el}
                </TitleLink>
              ) : (
                <SubLink
                  key={el}
                  className="s-link s-link__muted flex--item fc-black-400 "
                  href={stackUrl}
                >
                  {el}
                </SubLink>
              ),
            )}
            <SubLink
              className="s-link s-link__muted flex--item fc-black-400 mt16"
              href={stackUrl}
            >
              API
            </SubLink>
            <SubLink
              className="s-link s-link__muted flex--item fc-black-400 "
              href={stackUrl}
            >
              Data
            </SubLink>
          </div>
          <div className="flex--item d-flex fd-column jc-space-between">
            <div className="flex--item d-flex fd-row">
              {fifthArr.map(el => (
                <ShareLink
                  key={el}
                  className="s-link s-link__muted flex--item fc-black-400 m6"
                  href={stackUrl}
                >
                  {el}
                </ShareLink>
              ))}
            </div>
            <DesignDiv className="flex--item fc-black-400 ml6">
              Site design / logo © 2022 Stack Exchange Inc; user <br />
              contributions licensed under CC BY-SA.
              <br />
              rev 2022.10.26.42987
              <br />
            </DesignDiv>
          </div>
        </div>
      </FooterContainer>
    </FooterBackground>
  );
}

export default Footer;
