import React, { useReducer, useState, useEffect } from 'react';
import { todoReducer } from './TodoReducer';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import navImg from '../assets/images/bg-desktop-light.jpg'
import './todo.scss';

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <main>
      <section className="wrapper">
        <header>
          <img src={navImg} alt="navimage" />
        </header>
        <h1>Todo</h1>
        <TodoForm dispatch={dispatch} />

        <div className="todo-container">
          <ul className="todos">
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
            ))}
          </ul>
          <div className="actions">
            <p className="left-items"><span id="count">{todos.filter(todo => !todo.completed).length}</span> items left</p>
            <a href="#" className="clear-completed-btn" onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear Completed</a>
          </div>
        </div>
        <TodoFilters filter={filter} setFilter={setFilter} />
        <p className="drag-help-info">Drag and drop to reorder list</p>
      </section>
    </main>
  );
};

export default TodoApp;
