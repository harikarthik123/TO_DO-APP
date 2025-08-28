import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getTodos = (token) => API.get("/todos", { headers: { Authorization: `Bearer ${token}` } });
export const addTodo = (todo, token) => API.post("/todos", todo, { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (id, todo, token) => API.put(`/todos/${id}`, todo, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodo = (id, token) => API.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
