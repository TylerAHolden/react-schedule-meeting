import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { AvailableTimeslot } from './ScheduleMeeting'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getDay, isValid, format } from 'date-fns'

const StyledBackgroundEl = styled.div`
  width: 100%;
  height: 25px;
  background-color: blue;
`


type CalendarProps = {
  availableTimeslots: Array<AvailableTimeslot>;
  onDaySelected: (day: Date) => void;
};

const formatDate = (date: Date) => {
  return format(date, 'MM/dd/yyyy')
}

const ScheduleCalendar: React.FC<CalendarProps> = ({ availableTimeslots, onDaySelected }) => {
  const [daysAvailable, setDaysAvailable] = useState<Array<any>>([])

  useEffect(() => {
    const daysInTimeslots = availableTimeslots.map((slot) => {
      if (!isValid(slot.startTime)) throw new Error(`Invalid date for start time on slot ${slot.id}`)
      if (!isValid(slot.endTime)) throw new Error(`Invalid date for end time on slot ${slot.id}`)
      let startTimeDay = getDay(slot.startTime)
      let endTimeDay = getDay(slot.endTime)
      if (startTimeDay !== endTimeDay) throw new Error('Days should match in Timeslot start and end time' + startTimeDay.toString + ' | ' + endTimeDay.toString)
      return formatDate(slot.startTime)
    })

    setDaysAvailable([...new Set(daysInTimeslots)])
  }, availableTimeslots)

  return (
  <div style={{ width: '100%' }}>
    <h1>Number of days available {availableTimeslots.length}</h1>
    <Calendar onClickDay={(day) => onDaySelected(day)} tileContent={(props) => props.view === 'month' && daysAvailable.some(date => date === formatDate(props.date)) ? <StyledBackgroundEl /> : null}  />
  </div>
);
}

export default ScheduleCalendar;
