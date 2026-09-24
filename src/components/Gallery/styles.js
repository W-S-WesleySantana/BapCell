import styled from 'styled-components';

export const Section = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const WorkCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;

  h3 {
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .images {
    display: flex;
    gap: 0.5rem;

    div {
      flex: 1;
      text-align: center;
      span {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.subText};
        font-weight: 600;
        text-transform: uppercase;
      }
      img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 6px;
        margin-top: 0.3rem;
        background: ${({ theme }) => theme.inputBg};
      }
    }
  }
`;