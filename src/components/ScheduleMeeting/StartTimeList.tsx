import React from 'react';
import styled from 'styled-components';
import StartTimeListItem from './StartTimeListItem';
import { format } from 'date-fns';
import {AvailableTimeslot, StartTimeEvent} from './ScheduleMeeting';

type Props = {
  startTimeListItems?: StartTimeEvent[];
  selectedDay: Date;
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
};

const Container = styled.div`
  border: 1px solid rgba(0,0,0,.3);
  position: relative;
  display: flex;
  max-height: 100%;
  height: 100%;
  flex-direction: column;
`;

const SelectedDayTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 700;
`;

const ScrollContainer = styled.div`
  overflow: scroll;
  border: 1px solid red;
  max-height: 100%;
  flex: 1;
`;

const StartTimeList: React.FC<Props> = ({ startTimeListItems =[], selectedDay,  onStartTimeSelect }) => (
  <Container>
    <SelectedDayTitle>{format(selectedDay, 'cccc, LLLL do')}</SelectedDayTitle>
    <ScrollContainer>
      {startTimeListItems.map((startTimeEvent: any, i: number) => (
        <StartTimeListItem startTimeEvent={startTimeEvent} onStartTimeSelect={onStartTimeSelect} key={i} />
      ))}
    </ScrollContainer>
  </Container>
);

export default StartTimeList;
