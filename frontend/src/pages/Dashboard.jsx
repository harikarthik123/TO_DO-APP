import React, { useEffect, useState, useContext } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import EditTodoModal from '../components/EditTodoModal';
import FeelingLucky from '../components/FeelingLucky'; // Import FeelingLucky component
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';

export default function Dashboard({ toggleTheme, currentTheme }) {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", startDate: "", deadline: "" });
  const [loading, setLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showFeelingLucky, setShowFeelingLucky] = useState(false); // State for Feeling Lucky visibility
  const theme = useContext(ThemeContext);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos(user.token);
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const todoToSend = {
        title: form.title,
        description: form.description,
        startDate: form.startDate || null, // Send null if empty string
        deadline: form.deadline || null,   // Send null if empty string
      };
      await addTodo(todoToSend, user.token);
      setForm({ title: "", description: "", startDate: "", deadline: "" });
      fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, { completed: !completed }, user.token);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id, user.token);
    fetchTodos();
  };

  const handleEditSave = async (updatedData) => {
    await updateTodo(editingTodo._id, updatedData, user.token);
    setEditingTodo(null);
    fetchTodos();
  };

  return (
    <DashboardContainer>
      <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <DashboardContent>
        {user && <WelcomeMessage>Welcome, {user.username}!</WelcomeMessage>}
        <DashboardTitle>My Todos</DashboardTitle>
        <AddTodoForm onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Add a new todo title"
            value={form.title}
            onChange={handleChange}
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            name="description"
          />
          <input
            type="date"
            value={form.startDate}
            onChange={handleChange}
            name="startDate"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={handleChange}
            name="deadline"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Todo"}
          </button>
        </AddTodoForm>
        <FeelingLuckyButton onClick={() => setShowFeelingLucky(!showFeelingLucky)}>
          {showFeelingLucky ? 'Hide Lucky Quote' : 'Show Me Something Inspiring!'}
        </FeelingLuckyButton>
        {showFeelingLucky && <FeelingLucky />}
        <TodoList>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCard key={todo._id} completed={todo.completed}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                {todo.startDate && <p>Start Date: {new Date(todo.startDate).toLocaleDateString()}</p>}
                {todo.deadline && <p>Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>}
                <TodoActions>
                  <button onClick={() => handleToggle(todo._id, todo.completed)}>
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                  <button onClick={() => setEditingTodo(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </TodoActions>
              </TodoCard>
            ))
          ) : (
            <NoTodosMessage>No todos yet. Add one above!</NoTodosMessage>
          )}
        </TodoList>
      </DashboardContent>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={handleEditSave}
        />
      )}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.body};
  min-height: 100vh;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WelcomeMessage = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
  font-size: 2.2rem;
  font-weight: bold;
  animation: slideInFromTop 0.7s ease-out forwards;
  animation-delay: 0.1s;
`;

const DashboardTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};
  animation: slideInFromTop 0.6s ease-out;

  @keyframes slideInFromTop {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FeelingLuckyButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.gradientDark};
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-bottom: 2rem; /* Add margin below the button */
  display: block; /* Make it a block element */
  margin-left: auto; /* Center the button */
  margin-right: auto; /* Center the button */
  animation: popIn 0.7s ease-out forwards;
  animation-delay: 0.2s;

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const AddTodoForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  animation: slideInFromLeft 0.7s ease-out forwards;
  animation-delay: 0.1s;

  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  input {
    flex-grow: 1;
    padding: 0.75rem;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.buttonPrimaryBackground};
      box-shadow: ${props => props.theme.inputFocusShadow};
    }
  }

  button {
    padding: 0.75rem 1.5rem;
    background: #4caf50;
    color: ${props => props.theme.buttonPrimaryColor};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const TodoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Increased minmax for larger cards */
  gap: 1.5rem; /* Increased gap */
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.3s;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const TodoCard = styled.div`
  background: ${props => props.theme.cardBackground};
  padding: 1.5rem; /* Increased padding */
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  border-left: 6px solid ${props => (props.completed ? props.theme.todoBorderCompleted : props.theme.todoBorderPending)}; /* Thicker border */
  animation: popIn 0.7s ease-out forwards;
  animation-delay: 0.1s;

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  &:hover {
    transform: translateY(-5px) scale(1.02); /* More pronounced lift and slight scale */
    box-shadow: ${props => props.theme.cardShadow};
  }

  h3 {
    margin: 0 0 0.75rem 0; /* Adjusted margin */
    color: ${props => props.theme.text}; /* Darker color for prominence */
    font-size: 1.25rem; /* Larger title */
  }

  p {
    color: ${props => props.theme.text};
    font-size: 1rem; /* Slightly larger text */
    margin-bottom: 0.5rem;
  }
`;

const TodoActions = styled.div`
  margin-top: 1.5rem; /* Increased margin */
  display: flex;
  gap: 0.75rem; /* Increased gap */
  justify-content: flex-end; /* Align buttons to the right */

  button {
    padding: 0.6rem 1rem; /* Adjusted padding */
    border: none;
    border-radius: 6px; /* Slightly larger border radius */
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600; /* Bolder text */
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px); /* Subtle lift on hover */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    &:nth-child(1) { /* Mark as Complete/Incomplete button */
      background: ${props => props.theme.buttonPrimaryBackground};
      color: ${props => props.theme.buttonPrimaryColor};

      &:hover {
        background: ${props => props.theme.buttonPrimaryHover};
      }
    }

    &:nth-child(2) { /* Edit button */
      background: ${props => props.theme.todoBorderPending};
      color: ${props => props.theme.text};

      &:hover {
        background: ${props => props.theme.todoBorderPending};
      }
    }

    &:nth-child(3) { /* Delete button */
      background: #f44336;
      color: ${props => props.theme.buttonPrimaryColor};

      &:hover {
        background: #d32f2f;
      }
    }
  }
`;

const NoTodosMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  margin-top: 2rem;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.4s;
`;
