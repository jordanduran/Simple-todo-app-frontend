import axios from 'axios';

const API_URL = 'http://localhost:5001/api/todos';

// Create a new todo
export const createTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

// Get all todos
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
};
