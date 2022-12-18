import { styled } from 'goober';

type ButtonProps = {
  selected?: boolean;
  primaryColor: string;
  borderRadius: number;
  primaryColorFaded: string;
};

export const ThemedButton = styled('button')<ButtonProps>`
  padding: 16px;
  border: none;
  color: ${({ selected }) => (selected ? `rgb(255, 255, 255)` : `rgb(20,20,20)`)};
  background-color: ${({ selected, primaryColor }) => (selected ? primaryColor : `rgba(0,0,0,0)`)};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  :hover {
    opacity: 0.8;
    background-color: ${({ selected, primaryColor, primaryColorFaded }) =>
      selected ? primaryColor : primaryColorFaded};
  }
`;

export const StartTimeGridItemButton = styled('button')<ButtonProps>`
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: white;
  background-color: ${({ primaryColor }) => primaryColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
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
