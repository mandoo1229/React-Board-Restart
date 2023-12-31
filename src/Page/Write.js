import React, { useRef, useEffect, memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_ITEM, CHANGE_MENU } from '../reducers/BoardReducer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useInputs from '../hook/useInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} `;
}
//로컬시간에 맞춰서 년도, 날짜를 문자열로 변환하여 반환하는 함수이다. 글 작성시간을 표기한다.

const Write = memo(({ id, dispatch }) => {
  const item = {};
  const [state, onChangeInput] = useInputs({ title: '', content: '' });
  const { title } = state;
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const editorRef = useRef();
  const [content, setContent] = useState();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const navigate = useNavigate();
  //navigate는 페이지를 이동할 때 사용함.

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Write' });
    inputTitle.current.focus();
  }, [dispatch]);
  // 컴포넌트가 랜더링 될 때와 'dispatch'가 변경될 때 실행된다.

  useEffect(() => {
    if (editorLoaded && editorRef.current) {
      setContent(editorRef.current.getData());
    }
  }, [editorLoaded]);

  const onEditorReady = (editor) => {
    editorRef.current = editor;
    setEditorLoaded(true);
  };

  const onClickSubmit = () => {
    if (!title) {
      alert('제목을 작성해주세요');
      if (inputTitle.current) {
        inputTitle.current.focus();
      }
      //title에 글을 작성하지 않았을 때 실행됨
    } else if (!content) {
      alert('내용을 작성해주세요');
      if (inputContent.current) {
        inputContent.current.focus();
      }
      // content에 값을 입력하지 않았을 때 실행됨
    } else {
      item.id = id;
      item.title = title;
      item.content = content;
      item.date = formatDateTime(new Date());
      item.views = 0;
      dispatch({ type: ADD_ITEM, item });
      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      list.push(item);
      localStorage.setItem('list', JSON.stringify(list));
      localStorage.setItem('id', id + 1);
      navigate(`/detail/${item.id}`);
      item.content = content;
    }
  };
  // onClickSubmit을 클릭했을 때 실행되는 함수입니다. 글을 작성하고, 내용을 작성했을 때 else문이 실행됩니다.
  // 새로운 글 'item'을 생성하고, 'ADD_ITEM'액션을 디스패치하여 상태를 업데이트 합니다. 입력된 값을 localstorage에 값을 저장합니다.
  // 이후 detail페이지로 이동합니다.
  return (
    <div className="App">
      <TextField
        id="outlined-multiline-flexible"
        label="제목을 작성해주세요"
        multiline
        maxRows={4}
        ㅠ
        style={{ width: '60%', marginTop: '2%' }}
        ref={inputTitle}
        name="title"
        value={title}
        onChange={onChangeInput}
      />
      <br></br>
      <br></br>
      <br></br>

      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          placeholder: '내용을 입력해주세요.',
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
        onChange={(event, editor) => {
          // 에디터의 내용이 변경될 때마다 'content' 변수를 업데이트합니다.
          const data = editor.getData();
          setContent(data);
        }}
        onReady={(editor) => {
          onEditorReady(editor);
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%', marginTop: '16px' }}>
        <Button className="Button-save" variant="contained" onClick={onClickSubmit}>
          저장
        </Button>
        <Button variant="contained" color="error" style={{ marginLeft: '8px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            취소
          </Link>
        </Button>
      </div>
    </div>
  );
});

export default Write;
