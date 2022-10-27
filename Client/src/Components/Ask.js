import React, { useRef, useState } from 'react';
import styled from 'styled-components';
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

function Ask() {
  const editorRef = useRef();
  const [value, setValue] = useState('');

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setValue(data);
    console.log(typeof data);
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
                initialValue="hello react editor world!"
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
            <div className="d-flex gs4 gsy fd-column">
              <div className="d-flex ps-relative">
                <input
                  className="s-input"
                  id="example-item1"
                  type="text"
                  placeholder="e.g. (vba sql-server r)"
                />
              </div>
            </div>
          </div>
          <button className="s-btn ml8 mb32 s-btn__primary" type="button">
            Review your question
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </Structure>
    </AskContainer>
  );
}

export default Ask;
