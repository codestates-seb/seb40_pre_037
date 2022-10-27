import React, { useRef, useState } from 'react';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function TextEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState('');

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setValue(data);
    console.log(typeof data);
    console.log(value);
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
