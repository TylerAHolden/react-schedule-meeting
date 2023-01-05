import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Locale, format, getDay, isValid, startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { setup, styled } from 'goober';

import { AvailableTimeslot } from './ScheduleMeeting';

setup(React.createElement);

const StyledCalendar = styled(Calendar)`
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    border: 0;
    outline: none;
  }
  button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: hsl(0, 0%, 90.19607843137256%);
  }
  .react-calendar__navigation button[disabled] {
    background-color: hsl(0, 0%, 94.11764705882352%);
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }

  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgba(var(--text-color-rgb), .9);
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
    color: rgba(var(--text-color-rgb), .6);
  }

  button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222);
      border-radius: var(--border-radius);
    }
    color: rgba(var(--primary-color-text-shade-rgb), 1);
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--now.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--active.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    color: rgba(var(--primary-color-text-shade-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 0.111) 1px;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222)
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 1) 1px;
    }
    &.react-calendar__tile--now {
      &::after {
        background: rgba(var(--primary-color-rgb), 0.111);
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: rgba(var(--text-color-rgb), 1);
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: rgba(var(--text-color-rgb), 1);
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
  locale?: Locale;
};

const formatDate = (date: Date, locale?: Locale) => {
  return format(date, 'MM/dd/yyyy', { locale });
};

const ScheduleCalendar: React.FC<CalendarProps> = ({ availableTimeslots, onDaySelected, selectedDay, locale }) => {
  const [daysAvailable, setDaysAvailable] = useState<Array<any>>([]);

  useEffect(() => {
    const daysInTimeslots: string[] = [];
    availableTimeslots.map((slot) => {
      if (!isValid(new Date(slot.startTime))) throw new Error(`Invalid date for start time on slot ${slot.id}`);
      if (!isValid(new Date(slot.endTime))) throw new Error(`Invalid date for end time on slot ${slot.id}`);
      const startTimeDay = getDay(new Date(slot.startTime));
      const endTimeDay = getDay(new Date(slot.endTime));
      if (startTimeDay !== endTimeDay) {
        daysInTimeslots.push(formatDate(new Date(slot.endTime), locale));
      }
      daysInTimeslots.push(formatDate(new Date(slot.startTime), locale));
      return null;
    });

    setDaysAvailable([...new Set(daysInTimeslots)]);
  }, [availableTimeslots]);

  const _onClickDay = (day: Date) => {
    onDaySelected(day);
  };

  const _isTileDisabled = (props: CalendarTileProperties) => {
    return props.view === 'month' && !daysAvailable.some((date) => date === formatDate(props.date, locale));
  };

  const _renderClassName = (props: CalendarTileProperties) => {
    if (daysAvailable.some((date) => date === formatDate(props.date, locale))) return ['day-tile', 'active-day-tile'];
    return (props.view === 'month' && 'day-tile') || null;
  };

  return (
    <StyledCalendar
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
