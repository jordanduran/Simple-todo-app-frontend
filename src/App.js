import { useEffect, useState } from 'react';
import './App.css';
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from './services/todoService';
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = await createTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTodo(value);
  };

  const handleUpdate = async (id, updatedTodo) => {
    try {
      const res = await updateTodo(id, updatedTodo);
      if (res.status === 200) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      if (res.status === 204) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Add new todo:</label>
        </div>
        <input type='text' value={newTodo} onChange={handleChange} />
      </form>
      {todos.length ? (
        todos.map((todo) => {
          return (
            <div key={todo._id}>
              <h3 className={todo.completed ? 'todo-completed' : ''}>
                {todo.title}
              </h3>
              <div>
                <button
                  onClick={() =>
                    handleUpdate(todo._id, {
                      ...todo,
                      completed: !todo.completed,
                    })
                  }
                >
                  Complete
                </button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Nothing to do</p>
      )}
    </div>
  );
}

export default App;
