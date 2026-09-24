import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    color: ${({ theme }) => theme.subText};
    font-weight: 500;
    font-size: 0.95rem;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const IconButton = styled.button`
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const AdminButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.primary}22;
  }
`;