import React, { useState } from 'react';
import { TodoActionType } from './TodoReducer';

interface TodoFormProps {
  dispatch: React.Dispatch<TodoActionType>;
}

const TodoForm: React.FC<TodoFormProps> = ({ dispatch }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <span className="round"></span>
      <input
        type="text"
        id="todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Create a new todo..."
      />
      <button className="add-todo">Add todo</button>
    </form>
  );
};

export default TodoForm;
