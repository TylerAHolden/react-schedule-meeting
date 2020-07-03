import React from 'react';
import styled from 'styled-components';
import StartTimeListItem from './StartTimeListItem';
import { format } from 'date-fns';
import { AvailableTimeslot, StartTimeEvent } from './ScheduleMeeting';

type Props = {
  startTimeListItems?: StartTimeEvent[];
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
  emptyListContentEl?: React.ElementType;
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

const StyledP = styled.p`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
`;

const NoTimesAvailableContainer = styled.div`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartTimeList: React.FC<Props> = ({ startTimeListItems = [], onStartTimeSelect, emptyListContentEl }) => {
  
  const emptyListElement = emptyListContentEl || (
    <NoTimesAvailableContainer>
      <StyledP>No times available</StyledP>
    </NoTimesAvailableContainer>
  );

  return (
    <>
      {startTimeListItems.length === 0 ? (
        emptyListElement
      ) : (
        <Container>
          {startTimeListItems.map((startTimeEvent: any, i: number) => (
            <StartTimeListItem startTimeEvent={startTimeEvent} onStartTimeSelect={onStartTimeSelect} key={i} />
          ))}
        </Container>
      )}
    </>
  );
};

export default StartTimeList;
