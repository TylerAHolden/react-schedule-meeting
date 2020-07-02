import React from 'react';
import styled from 'styled-components';
import StartTimeListItem from './StartTimeListItem';
import { format } from 'date-fns';
import {AvailableTimeslot, StartTimeEvent} from './ScheduleMeeting';

type Props = {
  startTimeListItems?: StartTimeEvent[]; // TODO: set actual type
  selectedDay: Date;
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
};

const Container = styled.div`
  height: inherit;
  overflow: scroll;
  padding: 16px;
  border: 1px solid #A0A096;
  display: flex;
  flex-direction: column;
`;

const SelectedDayTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 700;
`;

const StartTimeList: React.FC<Props> = ({ startTimeListItems =[], selectedDay,  onStartTimeSelect }) => (
  <Container>
    <SelectedDayTitle>{format(selectedDay, 'cccc, LLLL do')}</SelectedDayTitle>
    {startTimeListItems.map((startTimeEvent: any, i: number) => (
      <StartTimeListItem startTimeEvent={startTimeEvent} onStartTimeSelect={onStartTimeSelect} key={i} />
    ))}
  </Container>
);

export default StartTimeList;
