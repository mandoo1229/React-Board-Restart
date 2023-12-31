import React from 'react';
import { useEffect } from 'react';
import { CHANGE_MENU } from '../reducers/BoardReducer';
import styled from '@emotion/styled';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { TodoProvider } from '../reducers/TodoContex';

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);

  margin: 0 auto;

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

function TodoTemplate({ children, dispatch }) {
  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Todo' });
  }, [dispatch]);
  return (
    <TodoProvider>
      <TodoTemplateBlock>
        {/* {children} */}
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplateBlock>
    </TodoProvider>
  );
}
export default TodoTemplate;
