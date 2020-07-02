import React from 'react';
import styled from 'styled-components';
import { AvailableTimeslot, StartTimeEvent } from './ScheduleMeeting';
import { format } from 'date-fns';

type Props = {
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
  startTimeEvent: StartTimeEvent;
};

const Container = styled.button`
  width: 100%;
  padding: 16px;
`;

const EventListItem: React.FC<Props> = ({ children, onStartTimeSelect, startTimeEvent }) => <Container onClick={() => onStartTimeSelect(startTimeEvent)}>{format(startTimeEvent.startTime, 'h:mm aaaa')}</Container>;

export default EventListItem;
