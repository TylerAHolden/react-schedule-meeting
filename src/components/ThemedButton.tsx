import { styled } from 'goober';

type ButtonProps = {
  selected?: boolean;
};

export const ThemedButton = styled('button')<ButtonProps>`
  padding: 16px;
  border: none;
  color: ${({ selected }) =>
    selected ? `rgba(var(--primary-color-contrast-rgb), 1)` : `rgba(var(--text-color-rgb), 1)`};
  background-color: ${({ selected }) => (selected ? 'rgba(var(--primary-color-rgb), 1)' : `rgba(0,0,0,0)`)};
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: ${({ selected }) =>
      selected ? 'rgba(var(--primary-color-rgb), 1)' : 'rgba(var(--background-color-contrast-rgb), 0.06)'};
  }
`;

export const StartTimeGridItemButton = styled('button')<ButtonProps>`
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  @media (max-width: 768px) {
    padding: 7px 12px;
  }
  :hover {
    opacity: 0.8;
  }
`;
