import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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

const Formblock = styled.form`
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
  > label {
    margin: 6px 0px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  display: block;
  height: 35px;
  padding: 0;
`;

const Errormsg = styled.p`
  display: block;
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px;
  font-size: 12px;
`;

function LoginComponent() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    axios
      .post('/members/login', {
        username: data.email,
        password: data.password,
      })
      .then(res => {
        console.log(res);
        if (res.headers.authorization) {
          localStorage.setItem('login-token', res.headers.authorization);
          localStorage.setItem('login-refresh', res.headers.refresh);
        }
        setLoginError(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setLoginError(true);
      });
  };

  return (
    <LoginPage>
      <Link to="/">
        <div className="ta-center fs-title mx-auto mb24">
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
        </div>
      </Link>

      <LoginContainer onSubmit={handleSubmit(onSubmit)}>
        <Formblock>
          <label className="flex--item s-label" htmlFor="email">
            Email
          </label>
          <Input
            className="flex--item s-input"
            type="email"
            id="email"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <Errormsg>Email cannot be empty.</Errormsg>
          )}
          {loginError ? (
            <Errormsg>The email or password is incorrect.</Errormsg>
          ) : null}
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
        <Formblock>
          <label className="flex--item s-label" htmlFor="password">
            Password
          </label>
          <Input
            className="flex--item s-input"
            type="password"
            id="password"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <Errormsg>Password cannot be empty.</Errormsg>
          )}
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
        <Formblock>
          <button
            className="s-btn s-btn__primary"
            type="button"
            onClick={handleSubmit(onSubmit)}
            onSubmit={handleSubmit(onSubmit)}
          >
            Log in
          </button>
          <p />
        </Formblock>
      </LoginContainer>
      <div style={{ padding: '16px', fontSize: '14px', lineHeight: '17px' }}>
        Don’t have an account? <a href="/signup">Sign up</a>
      </div>
    </LoginPage>
  );
}

export default LoginComponent;
