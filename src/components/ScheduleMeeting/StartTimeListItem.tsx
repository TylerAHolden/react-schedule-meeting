import React from 'react';
import styled from 'styled-components';
import { AvailableTimeslot, StartTimeEvent } from './ScheduleMeeting';
import { format } from 'date-fns';

type Props = {
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
  startTimeEvent: StartTimeEvent;
};

const Container = styled.button`
  padding: 16px;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  outline: none;

  :hover {
    background-color: #F0F0F0;
    cursor: pointer;

  }

  :focus {
    background-color: #e0e0e0;
  }
`;

const EventListItem: React.FC<Props> = ({ children, onStartTimeSelect, startTimeEvent }) => <Container onClick={() => onStartTimeSelect(startTimeEvent)}>{format(startTimeEvent.startTime, 'h:mmaaaa')}</Container>;

export default EventListItem;
