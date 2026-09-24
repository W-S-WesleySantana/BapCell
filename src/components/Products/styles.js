import styled from 'styled-components';

export const Section = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1.5rem;

  h2 {
    text-align: center;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p.subtitle {
    text-align: center;
    color: ${({ theme }) => theme.subText};
    margin-bottom: 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.2rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  position: relative;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 0.8rem;
    background: ${({ theme }) => theme.inputBg};
  }

  h3 {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  }

  p.price {
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
    font-size: 1.1rem;
    margin: 0.4rem 0 0.8rem 0;
  }

  a {
    margin-top: auto;
    background: ${({ theme }) => theme.primary};
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;

    &:hover {
      background: ${({ theme }) => theme.primaryHover};
    }
  }
`;