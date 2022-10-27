import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

const AskContainer = styled.div`
  margin-top: 80px;
  padding: 24px;
  max-width: 900px;
`;
const AskTitle = styled.h1`
  /* margin-left: 10px;
  margin-bottom: 20px; */
`;

const BackgroundImgDiv = styled.div`
  height: 120px;
  width: 1216px;
  /* padding-right: 300px; */
`;

const BackgroundImg = styled.img`
  height: 120px;
  width: 500px;
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
    <AskContainer className="ml128">
      <BackgroundImgDiv className="bg-right-top ai-center fd-row d-flex jc-space-between">
        <AskTitle className="fw-bold flex--item">
          Ask a public question
        </AskTitle>
        <BackgroundImg
          className="flex--item"
          src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368"
          alt="askImage"
        />
      </BackgroundImgDiv>
      <div className="mt24">
        <div className="ba bc-blue-200 bg-blue-050 p24 mb24 mt20 mr8 ml8 bar-sm">
          <h2 className="mb8 fw-normal fc-black-600">
            Writing a good question
          </h2>
          <p className="mb2 fw-normal fc-black-600 fs-body2">
            You’re ready to ask a programming-related question and this form
            will help guide you through the process.
          </p>
          <p className="fw-normal fc-black-600 fs-body2">
            Looking to ask a non-programming question? See the topics here to
            find a relevant site.
          </p>
          <h5 className="mb0 fw-bold fs-body1 fc-black-600">Steps</h5>
          <ul className="list-ls-disc mt6 fc-black-600">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt12 bar-sm">
          <h3 className="m0 fw-bold">Title</h3>
          <div className="mb4 fc-black-600 fs-caption">
            Be specific and imagine you’re asking a question to another person.
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
          <h3 className="m0 fw-bold">body</h3>
          <div className="mb4 fc-black-600 fs-caption">
            Introduce the problem and expand on what you put in the title.
            Minimum 15 characters.
          </div>
          <div className="edit_wrap">
            <Editor
              initialValue="hello react editor world!"
              previewStyle="vertical"
              height="600px"
              initialEditType="markdown"
              useCommandShortcut={false}
              language="ko-KR"
              hideModeSwitch
              ref={editorRef}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="ba bc-black-100 p24 mr8 ml8 mb12 mt24 bar-sm">
          <h3 className="m0 fw-bold">Tags</h3>
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
    </AskContainer>
  );
}

export default Ask;
