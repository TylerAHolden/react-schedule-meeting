/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './StartTimeList';
import styled from 'styled-components';
import {differenceInMinutes, addMinutes, isSameDay ,isSameMinute} from 'date-fns';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export type AvailableTimeslot = {
  startTime: Date;
  endTime: Date;
  id: string | number;
}

const testTimeslotsAvailable = [{
  startTime: '07/1/2020 10am',
  endTime: '07/1/2020 5pm',
  id: '1',
},
{
  startTime: '07/1/2020 11am',
  endTime: '07/1/2020 3pm',
  id: '2',
},
{
  startTime: '07/2/2020 10am',
  endTime: '07/2/2020 5pm',
  id: '1',
},
];

export type StartTimeEvent = {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
}



// let daysAvailable = [Date, Date, Date]
// shifts.map(item => getDurationInHours(item.start)) 

type Props = {
  eventDurationInMinutes: number, // minutes
  availableTimeslots: AvailableTimeslot[];
  onSelectedDayChange?: (day: Date) => Date;
  onStartTimeSelect?: (startTimeEvent: StartTimeEvent) => void;
}

export const ScheduleMeeting: React.FC<Props> = ({availableTimeslots = [], eventDurationInMinutes = 30, onSelectedDayChange, onStartTimeSelect}) => {
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

        let mutableTimeslotDuration = timeslotDuration;
        // create a start time for each possible event start time.
        while (mutableTimeslotDuration > eventDurationInMinutes){
          const newStartTimeEvent: StartTimeEvent = {
            availableTimeslot,
            startTime: addMinutes(availableTimeslot.startTime, mutableTimeslotDuration)
          }
          startTimeEvents.push(newStartTimeEvent);
          mutableTimeslotDuration = mutableTimeslotDuration - eventDurationInMinutes;
        }
        console.log('startTimeEvents.length',startTimeEvents.length);

      }

      setStartTimeEventsList(startTimeEvents);
  }, [availableTimeslots]);

  useEffect(() => {
    // set the displayed list to start time events for that specific day.
    const selectedDayStartTimeEvents = startTimeEventsList.filter((startTimeEvent)=> isSameDay(startTimeEvent.startTime, selectedDay));

    console.log("selectedDayStartTimeEvents",selectedDayStartTimeEvents)
    // remove duplicate start times - if we have overlapping "shifts" we dont need to keep displaying multiple available start times for each "shift"
    const duplicatesToKeep: StartTimeEvent[] = [];
    const duplicatesRemoved = selectedDayStartTimeEvents.filter((startTimeEvent: StartTimeEvent) => {
      const matchingTime = selectedDayStartTimeEvents.filter((item: StartTimeEvent) => isSameMinute(item.startTime, startTimeEvent.startTime));
      console.log("matchingTime",matchingTime)

      // if more than one matching start time is found,
      if (matchingTime.length > 0) {
        // check to see if we have already added one to the list
        const alreadyKeptMatchingTime = duplicatesToKeep.filter((item: StartTimeEvent) => isSameMinute(item.startTime, startTimeEvent.startTime));
      console.log("alreadyKeptMatchingTime",alreadyKeptMatchingTime)
      if (alreadyKeptMatchingTime.length > 0) {
          return true;
        } else {
          // we want to keep at least one.
          duplicatesToKeep.push(matchingTime[0]);
          return false;
        }
      } else {
        return true;
      }
    });

    console.log("duplicatesToKeep",duplicatesToKeep)
    console.log("duplicatesRemoved",duplicatesRemoved)

    const orderedEvents = [...duplicatesRemoved,...duplicatesToKeep].sort((a: StartTimeEvent, b:StartTimeEvent) => b.startTime.getTime() - a.startTime.getTime());
    console.log("orderedEvents",orderedEvents)
    
    setSelectedDayStartTimeEventsList(orderedEvents);

  }, [selectedDay, startTimeEventsList])

  return (
    <Container>
      <ScheduleCalendar availableTimeslots={availableTimeslots} onDaySelected={onDaySelected} />
      <StartTimeList onStartTimeSelect={_onStartTimeSelect} startTimeListItems={selectedDayStartTimeEventsList} selectedDay={selectedDay} />
    </Container>
  );
};
