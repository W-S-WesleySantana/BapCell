import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    overflow-x: hidden;
  }

  button {
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const darkTheme = {
  bg: '#0b0f19',
  cardBg: '#111827',
  border: '#1e293b',
  inputBg: '#1e293b',
  text: '#e2e8f0',
  subText: '#94a3b8',
  primary: '#0066ff',
  primaryHover: '#0052cc',
  accent: '#38bdf8',
};

export const lightTheme = {
  bg: '#f8fafc',
  cardBg: '#ffffff',
  border: '#e2e8f0',
  inputBg: '#f1f5f9',
  text: '#0f172a',
  subText: '#64748b',
  primary: '#0066ff',
  primaryHover: '#0052cc',
  accent: '#0284c7',
};