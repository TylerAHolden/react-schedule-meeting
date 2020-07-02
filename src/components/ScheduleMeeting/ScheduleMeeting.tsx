/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './StartTimeList';
import styled from 'styled-components';
import {differenceInMinutes, addMinutes, isSameDay} from 'date-fns';

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
    console.log(startTimeEventsList)
    // set the displayed list to start time events for that specific day.
    const selectedDayStartTimeEvents = startTimeEventsList.filter((startTimeEvent)=> {
      console.log(isSameDay(startTimeEvent.startTime, selectedDay));
      console.log(typeof startTimeEvent.startTime, typeof selectedDay);
      return isSameDay(startTimeEvent.startTime, selectedDay);
      
    });

    console.log('selectedDay', selectedDay);
    console.log('selectedDayStartTimeEvents', selectedDayStartTimeEvents);

    setSelectedDayStartTimeEventsList(selectedDayStartTimeEvents);

  }, [selectedDay, startTimeEventsList])

  return (
    <Container>
      <ScheduleCalendar availableTimeslots={availableTimeslots} onDaySelected={onDaySelected} />
      <StartTimeList onStartTimeSelect={_onStartTimeSelect} startTimeListItems={selectedDayStartTimeEventsList} selectedDay={selectedDay} />
    </Container>
  );
};
