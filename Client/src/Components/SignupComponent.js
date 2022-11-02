/*
책임개발자 : 한승호
최초생성일 : 2022.10.26
최근수정일 : 2022.11.02
개요 :
회원가입 페이지 컴포넌트
*/

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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

const HeadText = styled.div`
  text-align: center;
  display: block;
  font-size: 21px;
  color: #232629;
  margin-bottom: 24px;
  @media screen and (min-width: 817px) {
    display: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  width: 410px;
  height: 285px;
  display: block;
  @media screen and (max-width: 816px) {
    display: none;
  }
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

const Input = styled.input`
  display: block;
  width: 260px;
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

const Errormsg2 = styled.p`
  display: block;
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px 2px 2px 20px;
  font-size: 12px;
`;

function SignupComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = data => {
    axios
      .post('/members', {
        email: data.Email,
        name: data.name,
        password: data.password,
      })
      .then(response => {
        console.log(response);
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
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
        <HeadText>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </HeadText>
        <SignUpContainer onSubmit={handleSubmit(onSubmit)}>
          <Formblock>
            <label htmlFor="Display name">Display name</label>
            <Input
              className="flex--item s-input"
              type="name"
              id="Display name"
              {...register('name', {
                required: true,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <Errormsg>name cannot be empty.</Errormsg>
            )}
          </Formblock>
          <Formblock>
            <label htmlFor="Email">Email</label>
            <Input
              className="flex--item s-input"
              type="Email"
              id="Email"
              {...register('Email', {
                required: true,
                validate: {
                  emailcheck: value =>
                    (value &&
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                        value,
                      )) ||
                    `${watch('Email')} is not a valid email address`,
                },
              })}
            />
            {errors.Email && errors.Email.type === 'required' && (
              <Errormsg>Email cannot be empty.</Errormsg>
            )}
            {errors.Email && errors.Email.type === 'emailcheck' && (
              <Errormsg>{errors.Email.message}</Errormsg>
            )}
          </Formblock>
          <Formblock>
            <label htmlFor="password">Password</label>
            <Input
              className="flex--item s-input"
              type="password"
              id="password"
              {...register('password', {
                required: true,
                validate: {
                  numcheck: value =>
                    (value && /\d/.test(value)) ||
                    'Please add one of the following things to make your password stronger:',
                  lettercheck: value =>
                    (value && /[a-zA-Z]/.test(value)) ||
                    'Please add one of the following things to make your password stronger:',
                },
                minLength: 8,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <Errormsg>Password cannot be empty.</Errormsg>
            )}
            {errors.password && errors.password.type === 'numcheck' && (
              <Errormsg>{errors.password.message}</Errormsg>
            )}
            {errors.password && errors.password.type === 'numcheck' && (
              <Errormsg2>• numbers</Errormsg2>
            )}
            {errors.password && errors.password.type === 'lettercheck' && (
              <Errormsg>{errors.password.message}</Errormsg>
            )}
            {errors.password && errors.password.type === 'lettercheck' && (
              <Errormsg2>• letters</Errormsg2>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <Errormsg>
                Must contain at least {8 - watch('password').length} characters.
              </Errormsg>
            )}
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
              onClick={handleSubmit(onSubmit)}
              onSubmit={handleSubmit(onSubmit)}
            >
              Sign up
            </button>
            <p />
          </Formblock>
        </SignUpContainer>
        <div style={{ padding: '16px', fontSize: '14px', lineHeight: '17px' }}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </SignUpPage>
    </PageLayout>
  );
}

export default SignupComponent;
