
import './App.css';
import TodoList from './TodoList';
import React, {useState, useRef, useEffect } from 'react';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const newTodo = useRef(); // Allows this variable to be referenced by HTML input field

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored) { setTodos(stored); }
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearComplete() { // Archives todos that are completed
    const updatedTodos = [...todos];
    updatedTodos.forEach(t => {
      if (t.complete === true) {
        t.archived = true;
      }
    });
    setTodos(updatedTodos);
  }

  function reset() { // Reset all todos - fresh instance
    setTodos([]);
  }

  function addTodo(e) {
    if (newTodo.current.value) {
      const name = newTodo.current.value;
      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false, archived: false }];
      });

      newTodo.current.value = null;
    }
  }

  return (
    <>
    <TodoList todos={todos.filter(t => t.archived === false)} toggleTodo={toggleTodo}/>
    <input ref={newTodo} type="text" />
    <button onClick={addTodo}>Add todo</button>
    <button onClick={reset}>Reset</button>
    <button onClick={clearComplete}>CLEAR complete</button>
    <p>{todos.filter(todo => todo.complete === false).length} more todos to do</p>
    <p>{todos.filter(todo => todo.archived === true).length} todos archived</p>
    </>
  );
}

export default App;
