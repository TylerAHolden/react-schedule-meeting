import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { AvailableTimeslot } from './ScheduleMeeting'
import Calendar, { CalendarTileProperties } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getDay, isValid, format } from 'date-fns'
import './ScheduleCalendar.css'

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

  const _onClickDay = (day: Date) => {
    onDaySelected(day)
  }

  const _isTileDisabled = (props: CalendarTileProperties) => {
    return props.view === 'month' && !daysAvailable.some(date => date === formatDate(props.date))
  }

  // const _renderTileContent = (props: CalendarTileProperties) => {
  //   return props.view === 'month' && daysAvailable.some(date => date === formatDate(props.date)) ? <StyledBackgroundEl /> : null
  // }

  const _renderClassName = (props: CalendarTileProperties) => {
    if (daysAvailable.some(date => date === formatDate(props.date))) return ['day-tile', 'active-day-tile']
    return props.view === 'month' && 'day-tile' || null
  }

  return (
  <div>
    <Calendar 
      defaultView={'month'} 
      onClickDay={_onClickDay} 
      tileDisabled={_isTileDisabled} 
      tileClassName={_renderClassName} 
    />
  </div>
);
}



export default ScheduleCalendar;
