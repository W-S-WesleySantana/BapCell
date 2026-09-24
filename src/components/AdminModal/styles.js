import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
 
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    color: ${({ theme }) => theme.accent};
  }

  input[type="text"], input[type="password"] {
    width: 100%;
    padding: 0.7rem;
    margin-bottom: 0.8rem;
    background: ${({ theme }) => theme.inputBg};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 6px;
    color: ${({ theme }) => theme.text};
  }

  .file-input {
    margin-bottom: 0.8rem;
    label {
      display: block;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.subText};
      margin-bottom: 0.2rem;
    }
    input {
      color: ${({ theme }) => theme.text};
      font-size: 0.85rem;
    }
  }

  button {
    width: 100%;
    padding: 0.7rem;
    background: ${({ theme }) => theme.primary};
    color: #fff;
    border-radius: 6px;
    font-weight: bold;
    margin-top: 0.4rem;

    &:hover {
      background: ${({ theme }) => theme.primaryHover};
    }

    &.close {
      background: #dc2626;
      margin-top: 0.8rem;
      &:hover {
        background: #b91c1c;
      }
    }
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.inputBg};
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    font-size: 0.85rem;

    button {
      width: auto;
      padding: 0.3rem 0.6rem;
      background: #ef4444;
      margin: 0;
      font-size: 0.75rem;

      &:hover {
        background: #dc2626;
      }
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.2rem;

  button {
    flex: 1;
    background: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.5rem;
    margin: 0;
    font-size: 0.85rem;

    &.active {
      background: ${({ theme }) => theme.primary};
      color: #fff;
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;