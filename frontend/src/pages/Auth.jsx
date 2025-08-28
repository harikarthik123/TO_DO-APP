import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled, { ThemeContext } from 'styled-components';
import { registerUser, loginUser } from '../services/api';

const Auth = ({ initialIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.data.token) {
        login({ username: response.data.name, token: response.data.token });
        navigate('/dashboard');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password, username });
      if (response.data.success) {
        alert('Registration successful! Please login.');
        setIsLogin(true);
      } else {
        alert('Registration failed. Username or email might already be in use.');
      }
    } catch (error) {
      alert('An error occurred during registration.');
      console.error(error);
    }
  };

  return (
    <AuthContainer theme={theme}>
      <AuthForm theme={theme} onSubmit={isLogin ? handleLogin : handleRegister}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </p>
      </AuthForm>
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${props => props.theme.gradientLight};
  animation: gradientBackground 10s ease infinite alternate;

  @keyframes gradientBackground {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;

const AuthForm = styled.form`
  background: ${props => props.theme.cardBackground};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: slideInUp 0.6s ease-out;

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
    font-size: 2rem;
  }

  input {
    padding: 0.9rem;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 8px;
    font-size: 1rem;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.cardBackground};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.buttonPrimaryBackground};
      box-shadow: ${props => props.theme.inputFocusShadow};
    }
  }

  button {
    padding: 0.9rem;
    background: ${props => props.theme.buttonPrimaryBackground};
    color: ${props => props.theme.buttonPrimaryColor};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.2s ease;

    &:hover {
      background: ${props => props.theme.buttonPrimaryHover};
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
  }

  p {
    text-align: center;
    cursor: pointer;
    color: ${props => props.theme.buttonPrimaryBackground};
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: ${props => props.theme.buttonPrimaryHover};
    }
  }
`;

export default Auth;
