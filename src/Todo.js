import './App.css';

export default function Todo({ todo, toggleTodo }) {
  function handleClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleClick} /> {todo.name}
      </label>
    </div>
  )
}

