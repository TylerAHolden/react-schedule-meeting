/* eslint-disable */
import React, { createElement, useState, useEffect } from 'react';
import { isValid, getDay, format, startOfMonth, differenceInMinutes, addMinutes, isSameDay, isSameMinute, isPast, subMonths, addMonths, subDays, addDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import rgba from 'color-rgba';
import styled from 'styled-components';

const Arrow = ({ direction }) => (createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "26", height: "26", viewBox: "0 0 512 512" },
    createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: direction === "back" ? "M328 112L184 256l144 144" : "M184.001 400L328.001 256L184.001 112" })));

const StyledCalendar = styled(Calendar) `
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
const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy');
};
const ScheduleCalendar = ({ availableTimeslots, onDaySelected, selectedDay, borderRadius, primaryColor, primaryColorFaded, }) => {
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [r, g, b, alpha] = rgba(primaryColor) || [0, 0, 0, 1];
    const primaryColorToday = `rgba(${r},${g},${b},${alpha / 4.5})`;
    useEffect(() => {
        const daysInTimeslots = availableTimeslots.map((slot) => {
            if (!isValid(new Date(slot.startTime)))
                throw new Error(`Invalid date for start time on slot ${slot.id}`);
            if (!isValid(new Date(slot.endTime)))
                throw new Error(`Invalid date for end time on slot ${slot.id}`);
            const startTimeDay = getDay(new Date(slot.startTime));
            const endTimeDay = getDay(new Date(slot.endTime));
            if (startTimeDay !== endTimeDay)
                throw new Error('Days should match in Timeslot start and end time' + startTimeDay.toString + ' | ' + endTimeDay.toString);
            return formatDate(new Date(slot.startTime));
        });
        setDaysAvailable([...new Set(daysInTimeslots)]);
    }, [availableTimeslots]);
    const _onClickDay = (day) => {
        onDaySelected(day);
    };
    const _isTileDisabled = (props) => {
        return props.view === 'month' && !daysAvailable.some((date) => date === formatDate(props.date));
    };
    const _renderClassName = (props) => {
        if (daysAvailable.some((date) => date === formatDate(props.date)))
            return ['day-tile', 'active-day-tile'];
        return (props.view === 'month' && 'day-tile') || null;
    };
    return (React.createElement(StyledCalendar, { borderRadius: borderRadius, primaryColor: primaryColor, primaryColorFaded: primaryColorFaded, primaryColorToday: primaryColorToday, defaultView: 'month', onClickDay: _onClickDay, showNavigation: false, tileDisabled: _isTileDisabled, tileClassName: _renderClassName, value: selectedDay, activeStartDate: startOfMonth(selectedDay) }));
};

const Container = styled.div `
  display: flex;
  width: 100%;
  align-items: center;
`;
const Button = styled.button `
  padding: 16px;
  border: none;
  color: ${({ selected }) => (selected ? `rgb(255, 255, 255)` : `rgb(20,20,20)`)};
  background-color: ${({ selected, primaryColor }) => (selected ? primaryColor : `rgba(0,0,0,0)`)};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  :hover {
    opacity: 0.8;
    background-color: ${({ selected, primaryColor, primaryColorFaded }) => selected ? primaryColor : primaryColorFaded};
  }
`;
const CancelButton = styled.button `
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
const EventListItem = ({ onStartTimeSelect, startTimeEvent, selected, onCancelClicked, borderRadius, primaryColor, primaryColorFaded, }) => {
    return (React.createElement(Container, null,
        React.createElement(Button, { selected: Boolean(selected), borderRadius: borderRadius, primaryColorFaded: primaryColorFaded, primaryColor: primaryColor, onClick: onStartTimeSelect },
            selected && 'Confirm ',
            format(startTimeEvent.startTime, 'h:mm a')),
        selected && (React.createElement(CancelButton, { borderRadius: borderRadius, onClick: onCancelClicked }, "Cancel"))));
};

const Container$1 = styled.div `
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;
const ScrollEdgeFade = styled.div `
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
  }
`;
const ListItemDivider = styled.div `
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({ makeTransparent }) => (makeTransparent ? `transparent` : `rgba(0, 0, 0, 0.05)`)};
`;
const StyledP = styled.p `
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
`;
const NoTimesAvailableContainer = styled.div `
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EventList = ({ startTimeListItems = [], onStartTimeSelect, emptyListContentEl, borderRadius, primaryColorFaded, primaryColor, }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    const _onStartTimeSelect = (startTimeEvent, index) => {
        if (selectedItemIndex === index) {
            onStartTimeSelect(startTimeEvent);
        }
        else {
            setSelectedItemIndex(index);
        }
    };
    const emptyListElement = emptyListContentEl || (React.createElement(NoTimesAvailableContainer, null,
        React.createElement(StyledP, null, "No times available")));
    return (React.createElement(React.Fragment, null, startTimeListItems.length === 0 ? (emptyListElement) : (React.createElement(React.Fragment, null,
        React.createElement(ScrollEdgeFade, { className: "top" }),
        React.createElement(ScrollEdgeFade, { className: "bottom" }),
        React.createElement(Container$1, null, startTimeListItems.map((startTimeEvent, i) => (React.createElement(React.Fragment, { key: i },
            React.createElement(EventListItem, { primaryColorFaded: primaryColorFaded, borderRadius: borderRadius, primaryColor: primaryColor, onCancelClicked: () => setSelectedItemIndex(-1), selected: i === selectedItemIndex, startTimeEvent: startTimeEvent, onStartTimeSelect: () => _onStartTimeSelect(startTimeEvent, i) }),
            i !== startTimeListItems.length - 1 && (React.createElement(ListItemDivider, { makeTransparent: selectedItemIndex === i || selectedItemIndex === i + 1 }))))))))));
};

const Container$2 = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Inner = styled.div `
  display: flex;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: 0 5px 22px rgba(20, 21, 21, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  margin: 16px;
  flex-direction: column;
  background: white;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
  }
`;
const Divider = styled.div `
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;
const CalendarContainer = styled.div `
  flex: 1;
`;
const StartTimeListContainer = styled.div `
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;
const StartTimeListContainerAbsolute = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SelectedDayTitle = styled.h3 `
  margin: 0;
  padding: 0;
  font-weight: 700;
`;
const Header = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;
const ArrowButton = styled.button `
  outline: none;
  background: none;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  &:hover {
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.03);
  }
`;
const ScheduleMeeting = ({ availableTimeslots = [], borderRadius = 0, primaryColor = '#3f5b85', emptyListContentEl, eventStartTimeSpreadInMinutes = 0, eventDurationInMinutes = 30, onSelectedDayChange, onStartTimeSelect, scheduleMeetingStyles, }) => {
    const [r, g, b, alpha] = rgba(primaryColor) || [0, 0, 0, 1];
    const primaryColorRGB = `rgba(${r},${g},${b},${alpha})`;
    const primaryColorFaded = `rgba(${r},${g},${b},${alpha / 9})`;
    const [selectedDay, setSelectedDay] = React.useState(new Date());
    const [startTimeEventsList, setStartTimeEventsList] = React.useState([]);
    const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React.useState([]);
    const onDaySelected = (day) => {
        setSelectedDay(day);
        onSelectedDayChange && onSelectedDayChange(day);
    };
    const splitTimeslot = (startTimeEvent) => {
        const splitTimeslots = [null, null];
        const minutesIntoTimeslotEventWillStart = differenceInMinutes(startTimeEvent.startTime, new Date(startTimeEvent.availableTimeslot.startTime));
        if (minutesIntoTimeslotEventWillStart !== 0) {
            const newFirstTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeEvent.availableTimeslot.startTime,
                endTime: addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart),
            };
            splitTimeslots[0] = newFirstTimeslot;
        }
        const startTimeOfEndingSplitTimeslot = addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart + eventDurationInMinutes);
        if (differenceInMinutes(startTimeOfEndingSplitTimeslot, new Date(startTimeEvent.availableTimeslot.endTime)) !== 0) {
            const newSecondTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeOfEndingSplitTimeslot,
                endTime: startTimeEvent.availableTimeslot.endTime,
            };
            splitTimeslots[1] = newSecondTimeslot;
        }
        return splitTimeslots;
    };
    const _onStartTimeSelect = (startTimeEvent) => {
        const splitTimeslots = splitTimeslot(startTimeEvent);
        const startTimeEventEmitObject = Object.assign(Object.assign({}, startTimeEvent), { splitTimeslot: splitTimeslots });
        if (onStartTimeSelect) {
            onStartTimeSelect(startTimeEventEmitObject);
        }
    };
    useEffect(() => {
        // compile a list of all possible event start times given all timeslots
        const startTimeEvents = [];
        // iterate through all available timeslots
        for (const availableTimeslot of availableTimeslots) {
            const timeslotDuration = differenceInMinutes(new Date(availableTimeslot.endTime), new Date(availableTimeslot.startTime));
            // this prevents start times from being created where the event duration runs past the available timeslot
            let startTimesPossible = Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;
            while (startTimesPossible >= 0) {
                const newStartTimeEvent = {
                    availableTimeslot,
                    startTime: addMinutes(new Date(availableTimeslot.startTime), startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes)),
                };
                startTimeEvents.push(newStartTimeEvent);
                startTimesPossible--;
            }
        }
        setStartTimeEventsList(startTimeEvents);
    }, [availableTimeslots]);
    useEffect(() => {
        const startTimeEventsToDisplay = [];
        // filter out startTimeEvents so we get the list of ones to display next to the calendar
        for (const startTimeEvent of startTimeEventsList) {
            // make sure its the same day as the selected day
            if (isSameDay(startTimeEvent.startTime, selectedDay)) {
                // prevents duplicate times (in case there are multiple overlapping shifts)
                if (startTimeEventsToDisplay.filter((item) => isSameMinute(item.startTime, startTimeEvent.startTime)).length === 0) {
                    if (!isPast(startTimeEvent.startTime)) {
                        startTimeEventsToDisplay.push(startTimeEvent);
                    }
                }
            }
        }
        // order the events by first in the day
        const orderedEvents = startTimeEventsToDisplay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        setSelectedDayStartTimeEventsList(orderedEvents);
    }, [selectedDay, startTimeEventsList]);
    const goToPreviousMonth = () => {
        setSelectedDay(subMonths(selectedDay, 1));
    };
    const goToNextMonth = () => {
        setSelectedDay(addMonths(selectedDay, 1));
    };
    const goToPreviousDay = () => {
        setSelectedDay(subDays(selectedDay, 1));
    };
    const goToNextDay = () => {
        setSelectedDay(addDays(selectedDay, 1));
    };
    return (React.createElement(Container$2, null,
        React.createElement(Inner, { borderRadius: borderRadius, style: scheduleMeetingStyles },
            React.createElement(CalendarContainer, null,
                React.createElement(Header, null,
                    React.createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToPreviousMonth },
                        React.createElement(Arrow, { direction: "back" })),
                    React.createElement(SelectedDayTitle, null, format(selectedDay, 'LLLL yyyy')),
                    React.createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToNextMonth },
                        React.createElement(Arrow, { direction: "forward" }))),
                React.createElement(ScheduleCalendar, { borderRadius: borderRadius, primaryColor: primaryColorRGB, selectedDay: selectedDay, availableTimeslots: availableTimeslots, primaryColorFaded: primaryColorFaded, onDaySelected: onDaySelected })),
            React.createElement(Divider, null),
            React.createElement(StartTimeListContainer, null,
                React.createElement(StartTimeListContainerAbsolute, null,
                    React.createElement(Header, null,
                        React.createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToPreviousDay },
                            React.createElement(Arrow, { direction: "back" })),
                        React.createElement(SelectedDayTitle, null, format(selectedDay, 'cccc, LLLL do')),
                        React.createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToNextDay },
                            React.createElement(Arrow, { direction: "forward" }))),
                    React.createElement(EventList, { primaryColorFaded: primaryColorFaded, primaryColor: primaryColorRGB, borderRadius: borderRadius, emptyListContentEl: emptyListContentEl, onStartTimeSelect: _onStartTimeSelect, startTimeListItems: selectedDayStartTimeEventsList }))))));
};

export { ScheduleMeeting };
