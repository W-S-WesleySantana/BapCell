import styled from 'styled-components';

export const BudgetContainer = styled.section`
  max-width: 500px;
  margin: 3rem auto 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;

 

  h2 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.subText};
    margin-bottom: 1.5rem;
  }


  @media (max-width:500px){
    max-width: 350px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  text-align: left;

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.8rem;
    background: ${({ theme }) => theme.inputBg};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 6px;
    color: ${({ theme }) => theme.text};
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

export const WhatsappButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #25d366;
  color: #fff;
  font-weight: bold;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1rem;

  &:hover {
    background: #1eb954;
  }

  @media (max-width:500px){
    max-width: 300px;
    font-size: 12px;
  }
`;