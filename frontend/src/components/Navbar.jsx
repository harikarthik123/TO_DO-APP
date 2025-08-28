import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = ({ toggleTheme, currentTheme }) => {
  const { user, logout } = useAuth();

  return (
    <NavContainer>
      <AppName>Todo App</AppName>
      <NavLinks>
        {user ? (
          <>
            <UserName>{user.username}</UserName>
            <ThemeToggleButton onClick={toggleTheme}>
              {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </ThemeToggleButton>
            <NavButton onClick={logout}>Logout</NavButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavButton as={Link} to="/register">Register</NavButton>
          </>
        )}
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background: ${props => props.theme.cardBackground};
  box-shadow: ${props => props.theme.cardShadow};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideInFromTop 0.5s ease-out forwards;

  @keyframes slideInFromTop {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.buttonPrimaryBackground};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.buttonPrimaryBackground};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const NavButton = styled.button`
  background: ${props => props.theme.buttonPrimaryBackground};
  color: ${props => props.theme.buttonPrimaryColor};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.buttonPrimaryHover};
  }
`;

const UserName = styled.span`
  margin-right: 1rem;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const ThemeToggleButton = styled(NavButton)`
  background: ${props => props.theme.buttonSecondaryBackground};
  color: ${props => props.theme.buttonSecondaryColor};
  &:hover {
    background: ${props => props.theme.buttonSecondaryHover};
  }
`;

export default Navbar;
