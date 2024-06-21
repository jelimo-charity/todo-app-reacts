import React from 'react';
import { TodoActionType, Todo } from './TodoReducer';

interface TodoItemProps {
  todo: Todo;
  dispatch: React.Dispatch<TodoActionType>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, dispatch }) => {
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const handleEdit = () => {
    const newText = prompt('Edit todo', todo.text);
    if (newText !== null && newText.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, text: newText } });
    }
  };

  return (
    <li className="item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </p>
      <div className="btns">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </li>
  );
};

export default TodoItem;
