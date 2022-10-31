import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

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
  /* padding-right: 300px; */
`;

const Structure = styled.div`
  width: 800px;
`;
const AskTitle = styled.h1`
  /* margin-left: 10px;
  margin-bottom: 20px; */
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

function Ask() {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [tagItem, setTagItem] = useState([]);
  const [tagValue, setTagValue] = useState('');

  const onChange = () => {
    // console.log(e);
    const data = editorRef.current.getInstance().getHTML();
    setValue(data);
    // console.log(typeof data);
  };

  const onChangeTitle = e => {
    setTitleValue(e.target.value);
    // console.log(titleValue);
  };

  const onChangeTag = e => {
    setTagValue(e.target.value);
    // console.log(tagValue);
  };

  // const defaultValue = () => {
  //   // editorRef.current.setInstance().setMarkdown('hello react editor world!');
  //   // setValue('');
  //   // setTagValue('');
  //   // setTitleValue('');
  //   window.location.replace('/detail');
  // };

  const onClickQuestionButton = () => {
    axios
      .post(
        '/post',
        {
          title: titleValue,
          body: value,
          tags: tagItem,
        },
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('login-token')}`,
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .then(res => console.log(res))
      // .then(defaultValue())
      .catch(err => console.log(err));
  };

  const TagEnter = e => {
    if (
      e.key === 'Enter' &&
      !tagItem.includes(e.target.value) &&
      e.target.value.length !== 0
    ) {
      const updateTagList = [...tagItem];
      updateTagList.push(tagValue);
      setTagItem(updateTagList);
      setTagValue('');
      // console.log(tagItem);
    }
  };

  const deleteTagItem = index => {
    const deleteTag = tagItem.filter((el, idx) => idx !== index);
    setTagItem(deleteTag);
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
          </div>
          <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt24 bar-sm">
            <h3 className="mb2 fw-bold">body</h3>
            <div className="mb4 fc-black-600 fs-caption">
              Introduce the problem and expand on what you put in the title.
              Minimum 15 characters.
            </div>
            <div className="edit_wrap">
              <Editor
                // initialValue="write here"
                // previewStyle="vertical"
                height="300px"
                initialEditType="markdown"
                useCommandShortcut={false}
                // language="ko-KR"
                hideModeSwitch
                ref={editorRef}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt24 bar-sm">
            <h3 className="mb2 fw-bold">Tags</h3>
            <div className="mb4 fc-black-600 fs-caption">
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </div>
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
