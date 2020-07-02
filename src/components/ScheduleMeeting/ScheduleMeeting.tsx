/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './StartTimeList';
import styled from 'styled-components';
import {differenceInMinutes, addMinutes, isSameDay ,isSameMinute, isPast} from 'date-fns';

const Container = styled.div`
  display: flex;
  max-width: 1000px;
  border-radius: 6px;
  box-shadow: 0 5px 18px rgba(20, 21, 21, 0.32),
    0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  margin: 16px;
`;

const Divider = styled.div`
  width: 1px;
  background: rgba(0,0,0,.1);
  margin: 16px;
`;

const CalendarContainer = styled.div`
  flex: 1;
`;

const StartTimeListContainer = styled.div`
  flex: 1;
  max-height: 100%;
`;

export type AvailableTimeslot = {
  startTime: Date;
  endTime: Date;
  id: string | number;
}

export type StartTimeEvent = {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
}

type Props = {
  eventDurationInMinutes: number,
  eventStartTimeSpreadInMinutes?: number,
  availableTimeslots: AvailableTimeslot[];
  onSelectedDayChange?: (day: Date) => Date;
  onStartTimeSelect?: (startTimeEvent: StartTimeEvent) => void;
}

export const ScheduleMeeting: React.FC<Props> = ({availableTimeslots = [], eventStartTimeSpreadInMinutes = 30, eventDurationInMinutes = 30, onSelectedDayChange, onStartTimeSelect}) => {
  const [timeslots, setTimeslots] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  const [startTimeEventsList, setStartTimeEventsList] = React.useState([] as StartTimeEvent[]);
  const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React.useState([] as StartTimeEvent[]);

  const onDaySelected = (day: Date) => {
    setSelectedDay(day); 
    onSelectedDayChange && onSelectedDayChange(day);
  }

  const _onStartTimeSelect = (startTimeEvent: StartTimeEvent) =>{
    if (onStartTimeSelect) {
      onStartTimeSelect(startTimeEvent);
    }
  }

  useEffect(() => {
      // compile a list of all possible event start times given all timeslots
      let startTimeEvents = [];

      // iterate through all available timeslots
      for (let availableTimeslot of availableTimeslots) {
        const timeslotDuration = differenceInMinutes(availableTimeslot.endTime, availableTimeslot.startTime);

        // this prevents start times from being created where the event duration runs past the available timeslot
        const adjustedTimeslotDuration = timeslotDuration - eventDurationInMinutes;
        let startTimesPossible = Math.floor(adjustedTimeslotDuration / eventStartTimeSpreadInMinutes);

        while (startTimesPossible >= 0) {
            const newStartTimeEvent: StartTimeEvent = {
              availableTimeslot,
              startTime: addMinutes(availableTimeslot.startTime, (startTimesPossible * eventStartTimeSpreadInMinutes))
            }
            startTimeEvents.push(newStartTimeEvent);
            startTimesPossible--;
          
        }
      }

      setStartTimeEventsList(startTimeEvents);
  }, [availableTimeslots]);

  useEffect(() => {
    const startTimeEventsToDisplay: StartTimeEvent[]  = [];

    // filter out startTimeEvents so we get the list of ones to display next to the calendar
    for (let startTimeEvent of startTimeEventsList) {
      // make sure its the same day as the selected day
      if (isSameDay(startTimeEvent.startTime, selectedDay)) {
        // prevents duplicate times (in case there are multiple overlapping shifts)
        if (startTimeEventsToDisplay.filter((item: StartTimeEvent) => isSameMinute(item.startTime, startTimeEvent.startTime)).length === 0) {
          if (!isPast(startTimeEvent.startTime)){
            startTimeEventsToDisplay.push(startTimeEvent);
          }
        }
      }
    }

    // order the events by first in the day
    const orderedEvents = startTimeEventsToDisplay.sort((a: StartTimeEvent, b:StartTimeEvent) =>  a.startTime.getTime() - b.startTime.getTime());
    
    setSelectedDayStartTimeEventsList(orderedEvents);

  }, [selectedDay, startTimeEventsList])

  return (
    <Container>
      <CalendarContainer>
        <ScheduleCalendar availableTimeslots={availableTimeslots} onDaySelected={onDaySelected} />
      </CalendarContainer>
      <Divider />
      <StartTimeListContainer>
        <StartTimeList onStartTimeSelect={_onStartTimeSelect} startTimeListItems={selectedDayStartTimeEventsList} selectedDay={selectedDay} />
      </StartTimeListContainer>
    </Container>
  );
};
