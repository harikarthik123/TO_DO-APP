import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useState } from 'react';

const LightTheme = {
  body: '#f0f2f5',
  text: '#333',
  cardBackground: '#ffffff',
  cardShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
  buttonPrimaryBackground: '#2196f3',
  buttonPrimaryColor: 'white',
  buttonPrimaryHover: '#1976d2',
  buttonSecondaryBackground: '#e0e0e0',
  buttonSecondaryColor: '#555',
  buttonSecondaryHover: '#cccccc',
  inputBorder: '#ddd',
  inputFocusShadow: '0 0 0 2px rgba(33, 150, 243, 0.2)',
  gradientLight: 'linear-gradient(to right, #667eea, #764ba2)',
  gradientDark: 'linear-gradient(to right, #6dd5ed, #2193b0)',
  todoBorderCompleted: '#4CAF50',
  todoBorderPending: '#FFC107',
};

const DarkTheme = {
  body: '#282c36',
  text: '#f0f2f5',
  cardBackground: '#3a3f4b',
  cardShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  buttonPrimaryBackground: '#61dafb',
  buttonPrimaryColor: '#282c36',
  buttonPrimaryHover: '#21a1f1',
  buttonSecondaryBackground: '#555',
  buttonSecondaryColor: 'white',
  buttonSecondaryHover: '#777',
  inputBorder: '#555',
  inputFocusShadow: '0 0 0 2px rgba(97, 218, 251, 0.2)',
  gradientLight: 'linear-gradient(to right, #483a80, #3a2e6e)',
  gradientDark: 'linear-gradient(to right, #345e69, #1b4e5b)',
  todoBorderCompleted: '#66bb6a',
  todoBorderPending: '#ffd740',
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: all 0.2s ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.text};
  }

  input,
  button,
  textarea {
    font-family: 'Arial', sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease-in-out;
  }
`;

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard toggleTheme={toggleTheme} currentTheme={theme} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
