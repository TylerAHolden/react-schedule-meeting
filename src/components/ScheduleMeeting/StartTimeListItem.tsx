import React from 'react';
import styled from 'styled-components';
import { StartTimeEvent } from './ScheduleMeeting';
import { format } from 'date-fns';

type Props = {
  onStartTimeSelect: () => void;
  startTimeEvent: StartTimeEvent;
  selected?: boolean;
  onCancelClicked: () => void;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Button = styled.button<any>`
  padding: 16px;
  border: none;
  color: ${({ selected }) => (selected ? `rgb(255, 255, 255)` : `rgb(20,20,20)`)};
  background-color: ${({ selected }) => (selected ? `rgb(0, 104, 211)` : `rgba(0,0,0,0)`)};
  border-radius: 8px;
  outline: none;
  width: 100%;
  cursor: pointer;

  :hover {
    background-color: ${({ selected }) => (selected ? `rgba(0, 104, 211,.9)` : `rgba(0,0,0,.03)`)};
  }
`;

const CancelButton = styled.button`
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: 8px;
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const EventListItem: React.FC<Props> = ({ onStartTimeSelect, startTimeEvent, selected, onCancelClicked }) => {
  return (
    <Container>
      <Button selected={selected} onClick={onStartTimeSelect}>
        {selected && 'Confirm '}
        {format(startTimeEvent.startTime, 'h:mmaaaa')}
      </Button>
      {selected && <CancelButton onClick={onCancelClicked}>Cancel</CancelButton>}
    </Container>
  );
};

export default EventListItem;
