import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f1f2f3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const SignUpPage = styled.div`
  width: 421px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    justify-content: center;
    align-items: center;
  }
`;

const SignUpContainer = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 318px;
  background-color: white;
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

// const HeadText = styled.div`
//   text-align: center;
//   display: block;
//   font-size: 21px;
//   color: #232629;
//   margin-bottom: 24px;
// `;

const TextBox = styled.div`
  display: flex;
  width: 410px;
  height: 285px;
  display: block;
`;

const TitleText = styled.div`
  font-size: 27px;
  color: #232629;
  margin-bottom: 32px;
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const LeftText = styled.div`
  color: #232629;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SignupComponent() {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: inputEmail,
      name: inputName,
      password: inputPassword,
    };

    return axios
      .post('/members', data)
      .then(response => {
        console.log(response);
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        navigate('/');
      });
  };

  return (
    <PageLayout>
      <TextBox>
        <TitleText>Join the Stack Overflow community</TitleText>
        <TitleBox>
          <svg width="26" height="26" className="svg-icon mtn2 fc-blue-500 mr8">
            <path
              opacity=".5"
              d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
            />
            <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z" />
          </svg>
          <LeftText>Get unstuck — ask a question</LeftText>
        </TitleBox>
        <TitleBox>
          <svg width="26" height="26" className="svg-icon mtn2 fc-blue-500 mr8">
            <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
            <path
              opacity=".5"
              d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
            />
          </svg>
          <LeftText>Unlock new privileges like voting and commenting</LeftText>
        </TitleBox>
        <TitleBox>
          <svg width="26" height="26" className="svg-icon mtn2 fc-blue-500 mr8">
            <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z" />
            <path
              opacity=".5"
              d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
            />
          </svg>
          <LeftText>Save your favorite tags, filters, and jobs</LeftText>
        </TitleBox>
        <TitleBox>
          <svg width="26" height="26" className="svg-icon mtn2 fc-blue-500 mr8">
            <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z" />
          </svg>
          <LeftText>Earn reputation and badges</LeftText>
        </TitleBox>
      </TextBox>
      <SignUpPage>
        {/* <HeadText>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </HeadText> */}
        <button
          className="flex--item s-btn s-btn__icon s-btn__github bar-md ba bc-black-100"
          type="button"
          style={{ margin: '4px 0px 16px 0px', width: '318px' }}
          display="flex"
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
                  type="name"
                  id="Display name"
                  value={inputName}
                  onChange={e => setInputName(e.target.value)}
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
                <input
                  className="flex--item s-input"
                  type="Email"
                  id="Email"
                  value={inputEmail}
                  onChange={e => setInputEmail(e.target.value)}
                />
              </div>
            </form>
          </Formblock>
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
                  onChange={e => setInputPassword(e.target.value)}
                />
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
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>
          <Formblock>
            {' '}
            <button
              className="s-btn s-btn__primary"
              type="button"
              onClick={handleSubmit}
            >
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
    </PageLayout>
  );
}

export default SignupComponent;
