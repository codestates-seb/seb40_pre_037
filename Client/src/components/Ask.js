/*
책임개발자 : 최유정
최초생성일 : 2022.10.26
최근수정일 : 2022.11.3
개요 :
글작성 유효성 검사(유효하면 바로 작동이 될 수 있게 진행해보는중)
현재상황 : 버튼을 누르면 유효성 검사 -> 유효성 검사를 통과 했을 때 타이틀은 바로 반응 (수정 필요)
        바디, 태그는 바로 반응은 없으나 유효성 검사 통과 시 post 요청을 할 수 있음
        타이틀(5자 이상, 필수)
        바디(15자 이상 앞뒤 공백 제외)
        태그(1개 이상) -> 태그 작성 시의 태그 중복은 입력을 못하게 막아둠 
patch : params 받아서 조건에 부합하면 patch로 api 분기
상세페이지로 navigate시 에러 생기는 현상(post와 patch차이)이 있어서 메인페이지로 이동
*/
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useNavigate } from 'react-router-dom';

const AskContainer = styled.div`
  margin-top: 60px;
  margin-left: 5vw;
  padding: 24px;
  width: 100vw;
`;
const BackgroundImgDiv = styled.div`
  width: 100%;
  height: 120px;
  width: 90vw;
`;

const Structure = styled.div`
  width: 800px;
`;
const AskTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
`;

const InfoTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #525960;
`;

const SubInfoTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 1rem;
  color: #525960;
`;

const InfoP = styled.p`
  font-size: 15px;
  color: #525960;
  line-height: 20px;
  font-weight: 500;
`;

const InfoUl = styled.ul`
  font-size: 15px;
  color: #525960;
  line-height: 20px;
  font-weight: 500;
  list-style: disc;
`;

const InfoLi = styled.li`
  font-size: 14px;
  color: #525960;
  line-height: 18px;
  font-weight: 400;
  margin-left: 25px;
  &::marker {
    margin: 0px;
    font-size: 13px;
  }
`;

const BackgroundImg = styled.img`
  height: 120px;
  width: 500px;
  margin-left: 300px;
`;

const InputTagDiv = styled.div`
  height: 37px;
  width: 732px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #babfc4;
  border-radius: 5px;
  color: black;
  font-size: 14px;
  margin: 0px;
  padding: 0.3em 0.7em;
  overflow: scroll;
  &:focus {
    border: 1px solid red;
  }
`;

const InputTag = styled.input`
  background-color: #fff;
  border: none;
  width: 600px;
  height: 23px;
  &:focus {
    outline: none;
  }
`;
const NotValidInputDiv = styled.div`
  height: 37px;
  width: 732px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e87d81;
  border-radius: 5px;
  color: black;
  font-size: 14px;
  margin: 0px;
  padding: 0.3em 0.7em;
  overflow: scroll;
  &:focus {
    border: 1px solid red;
  }
`;
const TagLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #39739d;
  background-color: #e1ecf4;
  border-radius: 2px;
  margin: 2px;
  padding: 4px;
  font-weight: 500;
  font-size: 12px;
  height: 25px;
`;

const TagSpan = styled.span`
  font-size: 12px;
  line-height: 22px;
  margin-left: 2px;
  width: auto;
`;

const TagButton = styled.button`
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 2px;
  width: 16px;
  height: 16px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1px;
  margin-left: 4px;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    background-color: #39739d;
    color: #e1ecf4;
  }
`;

const ValidText = styled.div`
  font-size: 0.8rem;
  color: #e87d81;
  padding-top: 5px;
  padding-left: 1px;
`;

const EditorWrapDiv = styled.div`
  border: 1px solid #e87d81;
  border-radius: 4px;
`;

function Ask() {
  const editorRef = useRef();
  const [titleValue, setTitleValue] = useState('');
  const [value, setValue] = useState('');
  const [tagItem, setTagItem] = useState([]);
  const [tagValue, setTagValue] = useState('');
  const [validValue, setValidValue] = useState('');
  const [validTitleTest, setValidTitleTest] = useState(true);
  const [validBodyTest, setValidBodyTest] = useState(true);
  const [validTagTest, setValidTagTest] = useState(true);
  const urlParams = new URL(window.location.href).searchParams;
  const detailId = urlParams.get('postId');
  const navigate = useNavigate();
  useEffect(() => {
    if (detailId) {
      axios.get(`/api/post/${detailId}`).then(res => {
        setTitleValue(res.data.title);
        setTagItem(res.data.tags);
        setValue(editorRef.current.getInstance().setHTML(res.data.body));
      });
    }
  }, []);

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    const datas = editorRef.current
      .getInstance()
      .getHTML()
      .replace(/<[^>]*>?/g, ''); // html태그 제거 정규식 대박...
    setValidValue(datas);
    setValue(data);
    // if (datas.trim().length >= 15) {
    //   setValidBodyTest(true);
    // } else {
    //   setValidBodyTest(false);
    // }
  };

  const onChangeTitle = e => {
    setTitleValue(e.target.value);
    if (titleValue.trim().length >= 5) {
      setValidTitleTest(true);
    } else {
      setValidTitleTest(false);
    }
  };

  const onChangeTag = e => {
    setTagValue(e.target.value);
  };

  const defaultValue = () => {
    navigate(`/?sortBy=present&page=1`);
  };

  const TagEnter = e => {
    if (
      e.key === 'Enter' &&
      !tagItem.includes(e.target.value) &&
      e.target.value.length !== 0
    ) {
      // console.log(e.target.value);
      const updateTagList = [...tagItem];
      updateTagList.push(tagValue);
      setTagItem(updateTagList);
      setTagValue('');
    }
  };

  const deleteTagItem = index => {
    const deleteTag = tagItem.filter((el, idx) => idx !== index);
    setTagItem(deleteTag);
  };

  const onClickQuestionButton = () => {
    if (
      titleValue.length >= 5 &&
      validValue.length >= 15 &&
      tagItem.length !== 0
    ) {
      if (detailId) {
        axios
          .patch(
            `/api/post/${detailId}`,
            {
              title: titleValue,
              body: value,
              tags: tagItem,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('login-token')}`,
              },
            },
          )
          .then(defaultValue());
      } else {
        axios
          .post(
            '/api/post',
            {
              title: titleValue,
              body: value,
              tags: tagItem,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('login-token')}`,
              },
            },
          )
          .then(defaultValue());
      }
    } else {
      setValidTitleTest(false);
      setValidBodyTest(false);
      setValidTagTest(false);
    }
  };

  return (
    <AskContainer>
      <Structure>
        <BackgroundImgDiv className="bg-right-top ai-center fd-row d-flex">
          <AskTitle>Ask a public question</AskTitle>
          <BackgroundImg
            className="flex--item"
            src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368"
            alt="askImage"
          />
        </BackgroundImgDiv>
        <div className="mt24">
          <div className="ba bc-blue-200 bg-blue-050 p24 mb24 mt20 mr8 ml8 bar-sm">
            <InfoTitle>Writing a good question</InfoTitle>
            <InfoP>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </InfoP>
            <InfoP>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </InfoP>
            <SubInfoTitle>Steps</SubInfoTitle>
            <InfoUl>
              <InfoLi>Summarize your problem in a one-line title.</InfoLi>
              <InfoLi>Describe your problem in more detail.</InfoLi>
              <InfoLi>
                Describe what you tried and what you expected to happen.
              </InfoLi>
              <InfoLi>
                Add “tags” which help surface your question to members of the
                community.
              </InfoLi>
              <InfoLi>Review your question and post it to the site.</InfoLi>
            </InfoUl>
          </div>
          <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt12 bar-sm">
            <h3 className="mb2 fw-bold">Title</h3>
            <div className="mb4 fc-black-600 fs-caption">
              Be specific and imagine you’re asking a question to another
              person.
            </div>
            {validTitleTest ? (
              <div className="d-flex gs4 gsy fd-column">
                <div className="d-flex ps-relative">
                  <input
                    value={titleValue}
                    onChange={onChangeTitle}
                    className="s-input"
                    id="example-item1"
                    type="text"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  />
                </div>
              </div>
            ) : (
              <div className="d-flex gs4 gsy fd-column">
                <div className="d-flex ps-relative">
                  <input
                    value={titleValue}
                    onChange={onChangeTitle}
                    className="s-input bc-red-300"
                    id="example-item1"
                    type="text"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  />
                </div>
                <ValidText>Minimum 5 characters</ValidText>
              </div>
            )}
          </div>
          <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt24 bar-sm">
            <h3 className="mb2 fw-bold">body</h3>
            <div className="mb4 fc-black-600 fs-caption">
              Introduce the problem and expand on what you put in the title.
              Minimum 15 characters.
            </div>
            {validBodyTest ? (
              <div className="edit_wrap">
                <Editor
                  initialValue="write here"
                  height="300px"
                  initialEditType="markdown"
                  useCommandShortcut={false}
                  hideModeSwitch
                  ref={editorRef}
                  onChange={onChange}
                />
              </div>
            ) : (
              <>
                <EditorWrapDiv className="edit_wrap">
                  <Editor
                    initialValue="write here"
                    height="300px"
                    initialEditType="markdown"
                    useCommandShortcut={false}
                    hideModeSwitch
                    ref={editorRef}
                    onChange={onChange}
                  />
                </EditorWrapDiv>
                <ValidText>Minimum 15 characters</ValidText>
              </>
            )}
          </div>
          <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt24 bar-sm">
            <h3 className="mb2 fw-bold">Tags</h3>
            <div className="mb4 fc-black-600 fs-caption">
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </div>
            {validTagTest ? (
              <InputTagDiv>
                <ul className="d-flex ps-relative">
                  {tagItem.map((el, idx) => {
                    return (
                      <TagLi key={el}>
                        <TagSpan>{el}</TagSpan>
                        <TagButton
                          type="button"
                          onClick={() => deleteTagItem(idx)}
                        >
                          ⅹ
                        </TagButton>
                      </TagLi>
                    );
                  })}
                </ul>
                <InputTag
                  value={tagValue}
                  onChange={onChangeTag}
                  onKeyPress={TagEnter}
                  type="text"
                  placeholder="press enter"
                />
              </InputTagDiv>
            ) : (
              <>
                <NotValidInputDiv>
                  <ul className="d-flex ps-relative">
                    {tagItem.map((el, idx) => {
                      return (
                        <TagLi key={el}>
                          <TagSpan>{el}</TagSpan>
                          <TagButton
                            type="button"
                            onClick={() => deleteTagItem(idx)}
                          >
                            ⅹ
                          </TagButton>
                        </TagLi>
                      );
                    })}
                  </ul>
                  <InputTag
                    value={tagValue}
                    onChange={onChangeTag}
                    onKeyPress={TagEnter}
                    type="text"
                    placeholder="press enter"
                  />
                </NotValidInputDiv>
                <ValidText>Minimum 1 tag</ValidText>
              </>
            )}
          </div>
          <button
            onClick={onClickQuestionButton}
            className="s-btn ml8 mb32 s-btn__primary"
            type="button"
          >
            Review your question
          </button>
        </div>
        {/* {console.log(value)} */}
      </Structure>
    </AskContainer>
  );
}

export default Ask;
