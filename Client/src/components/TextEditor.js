import React, { useRef } from 'react';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function TextEditor({ setValue, setSendAnswer }) {
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setValue(data);
    if (data.length < 16) {
      // 유효성 검사
      setSendAnswer(false);
    } else {
      setSendAnswer(true);
    }
  };

  return (
    <div className="edit_wrap">
      <Editor
        initialValue="hello world!"
        previewStyle="vertical"
        height="300px"
        initialEditType="markdown"
        useCommandShortcut={false}
        language="ko-KR"
        hideModeSwitch
        ref={editorRef}
        onChange={onChange}
      />
    </div>
  );
}
