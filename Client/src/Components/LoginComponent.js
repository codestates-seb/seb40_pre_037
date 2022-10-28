import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curUserAtom, usersAtom } from '../atoms';

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 288px;
`;

const LoginContainer = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 288px;
  border-radius: 7px;
  padding: 24px;
  margin-bottom: 24px;
  font-size: 13px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
`;

const FormContainer = styled.form`
  flex-direction: column;
  margin: 0;
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

function LoginComponent() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const setCurUser = useSetRecoilState(curUserAtom);
  const users = useRecoilValue(usersAtom);
  const navigate = useNavigate();

  const handleEmail = e => {
    setInputEmail(e.target.value);
  };

  const handlePassword = e => {
    setInputPassword(e.target.value);
  };

  const onClickLogin = e => {
    e.preventDefault();
    users.forEach(user => {
      if (user.email === inputEmail && user.password === inputPassword) {
        setCurUser(user);
        navigate('/');
      } else {
        alert('없는 이메일이거나 패스워드가 틀렸습니다.');
      }
    });
  };

  return (
    <LoginPage>
      <Link to="/">
        <div className="ta-center fs-title mx-auto mb24">
          <a href="https://stackoverflow.com/questions">
            <svg
              aria-hidden="true"
              className="native svg-icon iconLogoGlyphMd"
              width="32"
              height="37"
              viewBox="0 0 32 37"
            >
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
              <path
                d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                fill="#F48024"
              />
            </svg>{' '}
          </a>
        </div>
      </Link>

      <button
        className="flex--item s-btn s-btn__icon s-btn__github bar-md ba bc-black-100"
        type="button"
        style={{ margin: '0px 0px 16px 0px', width: '100%' }}
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
        </svg>{' '}
        Log in with GitHub{' '}
      </button>
      <LoginContainer>
        <FormContainer>
          <Formblock>
            <form className="d-flex gs4 gsy fd-column">
              <label className="flex--item s-label" htmlFor="email">
                Email
              </label>
              <div className="d-flex ps-relative">
                <input
                  className="flex--item s-input"
                  type="email"
                  id="email"
                  value={inputEmail}
                  onChange={handleEmail}
                />
              </div>
            </form>
            <svg
              aria-hidden="true"
              className="s-input-icon js-alert-icon d-none svg-icon iconAlertCircle"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8ZM8 4v6h2V4H8Zm0 8v2h2v-2H8Z" />
            </svg>
            <p />
          </Formblock>
          {/* // */}
          <Formblock>
            <form className="d-flex gs4 gsy fd-column">
              <label className="flex--item s-label" htmlFor="password">
                Password
              </label>
              <div className="d-flex ps-relative">
                <input
                  className="flex--item s-input"
                  type="password"
                  id="password"
                  value={inputPassword}
                  onChange={handlePassword}
                />
              </div>
            </form>
            <svg
              aria-hidden="true"
              className="s-input-icon js-alert-icon d-none svg-icon iconAlertCircle"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8ZM8 4v6h2V4H8Zm0 8v2h2v-2H8Z" />
            </svg>
            <p />
          </Formblock>
          {/* // */}
          <Formblock>
            <button
              className="s-btn s-btn__primary"
              type="button"
              onClick={onClickLogin}
            >
              Log in
            </button>
            <p />
          </Formblock>
        </FormContainer>
      </LoginContainer>
      <div style={{ padding: '16px', fontSize: '14px', lineHeight: '17px' }}>
        Don’t have an account?{' '}
        <Link to="/signup">
          <a href="/users/signup">Sign up</a>
        </Link>
      </div>
    </LoginPage>
  );
}

export default LoginComponent;
