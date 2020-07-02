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
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;


const ScrollContainer = styled.div`
  border: 1px solid red;
  max-height: 100%;
  flex: 1;
`;

const StartTimeList: React.FC<Props> = ({ startTimeListItems =[], selectedDay,  onStartTimeSelect }) => (
  <Container>
      {startTimeListItems.map((startTimeEvent: any, i: number) => (
        <StartTimeListItem startTimeEvent={startTimeEvent} onStartTimeSelect={onStartTimeSelect} key={i} />
      ))}
  </Container>
);

export default StartTimeList;
