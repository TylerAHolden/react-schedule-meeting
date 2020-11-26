import 'react-calendar/dist/Calendar.css';

import Calendar, { CalendarTileProperties } from 'react-calendar';
import React, { useEffect, useState } from 'react';
import { format, getDay, isValid, startOfMonth } from 'date-fns';

import { AvailableTimeslot } from './ScheduleMeeting';
import rgba from 'color-rgba';
import styled from 'styled-components';

type CalendarStyleProps = {
  borderRadius: number;
  primaryColor: string;
  primaryColorFaded: string;
  primaryColorToday: string;
};

const StyledCalendar = styled(Calendar)<CalendarStyleProps>`
  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgb(167, 167, 167);
    padding: 5px;
    position: relative;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: -1;
    }
  }

  .day-tile abbr {
    font-weight: bold;
    font-size: 15.33px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgb(218, 218, 218);
  }

  .react-calendar button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: ${({ primaryColorFaded }) => primaryColorFaded};
      border-radius: ${({ borderRadius }) => borderRadius}px;
    }
    color: ${({ primaryColor }) => primaryColor};
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    background-color: #fff;
  }

  .react-calendar__tile--now.day-tile {
    background: #fff;
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      background: ${({ primaryColorToday }) => primaryColorToday};
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    background: #fff;
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      background: ${({ primaryColorToday }) => primaryColorToday};
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: #fff;
  }

  .react-calendar__tile--active.day-tile {
    background: #fff;
    color: ${({ primaryColor }) => primaryColor};
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      border: solid ${({ primaryColorToday }) => primaryColorToday} 1px;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: ${({ primaryColorFaded }) => primaryColorFaded};
      border-radius: ${({ borderRadius }) => borderRadius}px;
      border: solid ${({ primaryColor }) => primaryColor} 1px;
    }
    &.react-calendar__tile--now {
      &::after {
        background: ${({ primaryColorToday }) => primaryColorToday};
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: #333;
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: #333;
  }

  /* calendar styles */
  &.react-calendar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    border: none !important;
    width: 100% !important;
    min-height: 390px;
    @media (max-width: 768px) {
      min-height: 302px;
    }
  }
`;

type CalendarProps = {
  availableTimeslots: Array<AvailableTimeslot>;
  onDaySelected: (day: Date) => void;
  selectedDay: Date;
  borderRadius: number;
  primaryColor: string;
  primaryColorFaded: string;
};

const formatDate = (date: Date) => {
  return format(date, 'MM/dd/yyyy');
};

const ScheduleCalendar: React.FC<CalendarProps> = ({
  availableTimeslots,
  onDaySelected,
  selectedDay,
  borderRadius,
  primaryColor,
  primaryColorFaded,
}) => {
  const [daysAvailable, setDaysAvailable] = useState<Array<any>>([]);
  const [r, g, b, alpha] = rgba(primaryColor)!;
  const primaryColorToday = `rgba(${r},${g},${b},${alpha / 4.5})`;

  useEffect(() => {
    const daysInTimeslots = availableTimeslots.map((slot) => {
      if (!isValid(slot.startTime)) throw new Error(`Invalid date for start time on slot ${slot.id}`);
      if (!isValid(slot.endTime)) throw new Error(`Invalid date for end time on slot ${slot.id}`);
      let startTimeDay = getDay(slot.startTime);
      let endTimeDay = getDay(slot.endTime);
      if (startTimeDay !== endTimeDay)
        throw new Error(
          'Days should match in Timeslot start and end time' + startTimeDay.toString + ' | ' + endTimeDay.toString,
        );
      return formatDate(slot.startTime);
    });

    setDaysAvailable([...new Set(daysInTimeslots)]);
  }, [availableTimeslots]);

  const _onClickDay = (day: Date) => {
    onDaySelected(day);
  };

  const _isTileDisabled = (props: CalendarTileProperties) => {
    return props.view === 'month' && !daysAvailable.some((date) => date === formatDate(props.date));
  };

  const _renderClassName = (props: CalendarTileProperties) => {
    if (daysAvailable.some((date) => date === formatDate(props.date))) return ['day-tile', 'active-day-tile'];
    return (props.view === 'month' && 'day-tile') || null;
  };

  return (
    <StyledCalendar
      borderRadius={borderRadius}
      primaryColor={primaryColor}
      primaryColorFaded={primaryColorFaded}
      primaryColorToday={primaryColorToday}
      defaultView={'month'}
      onClickDay={_onClickDay}
      showNavigation={false}
      tileDisabled={_isTileDisabled}
      tileClassName={_renderClassName}
      value={selectedDay}
      activeStartDate={startOfMonth(selectedDay)}
    />
  );
};

export default ScheduleCalendar;
