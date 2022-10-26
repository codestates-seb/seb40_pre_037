import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpPage = styled.div`
  width: 421px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 318px;
  /* height: 234px; */
  border-radius: 7px;
  padding: 24px;
  margin-bottom: 24px;
  font-size: 13px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
`;

const Formblock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 6px 0px;
  > button {
    background-color: #0a95ff;
    margin: 6px 0px;
    :hover {
      background-color: #0074cc;
    }
  }
  > form {
    margin: 6px 0px;
  }
  > form > label {
    font-size: 15px;
  }
`;

const HeadText = styled.div`
  text-align: center;
  display: block;
  font-size: 21px;
  color: #232629;
  margin-bottom: 24px;
`;

function SignupComponent() {
  return (
    <SignUpPage>
      <HeadText>
        Create your Stack Overflow account. It’s free and only takes a minute.
      </HeadText>
      <button
        className="flex--item s-btn s-btn__icon s-btn__github bar-md ba bc-black-100"
        type="button"
        style={{ margin: '0px 0px 16px 0px', width: '318px' }}
      >
        <svg
          aria-hidden="true"
          className="svg-icon iconGitHub"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"
            fill="#010101"
          />
        </svg>
        Sign up with GitHub{' '}
      </button>
      <SignUpContainer>
        <Formblock>
          <form className="d-flex gs4 gsy fd-column">
            <label className="flex--item s-label" htmlFor="Display name">
              Display name
            </label>
            <div className="d-flex ps-relative">
              <input
                className="flex--item s-input"
                type="text"
                id="Display name"
              />
            </div>
          </form>
        </Formblock>
        <Formblock>
          <form className="d-flex gs4 gsy fd-column">
            <label className="flex--item s-label" htmlFor="Email">
              Email
            </label>
            <div className="d-flex ps-relative">
              <input className="flex--item s-input" type="text" id="Email" />
            </div>
          </form>
        </Formblock>
        <Formblock>
          <form className="d-flex gs4 gsy fd-column">
            <label className="flex--item s-label" htmlFor="password">
              Password
            </label>
            <div className="d-flex ps-relative">
              <input className="flex--item s-input" type="text" id="password" />
            </div>
          </form>
        </Formblock>
        <p
          style={{
            fontSize: '13px',
            color: '#6a737c',
            lineHeight: '15.6923px',
            display: 'block',
            textAlign: 'left',
          }}
        >
          Passwords must contain at least eight characters, including at least 1
          letter and 1 number.
        </p>
        <Formblock>
          {' '}
          <button className="s-btn s-btn__primary" type="button">
            Sign up
          </button>
          <p />
        </Formblock>
      </SignUpContainer>
      <div style={{ padding: '16px', fontSize: '14px', lineHeight: '17px' }}>
        Already have an account?{' '}
        <Link to="/login">
          <a href="/users/signup">Log in</a>
        </Link>
      </div>
    </SignUpPage>
  );
}

export default SignupComponent;
