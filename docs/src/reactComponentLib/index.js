/* eslint-disable */
import { isValid, getDay, format, startOfMonth, differenceInMinutes, addMinutes, isSameDay, isSameMinute, isPast, isAfter, isToday, subMonths, addMonths, subDays, addDays } from 'date-fns';
import * as React from 'react';
import React__default, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import rgba from 'color-rgba';
import styled from 'styled-components';

const Arrow = ({ direction }) => (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "26", height: "26", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: direction === 'back' ? 'M328 112L184 256l144 144' : 'M184.001 400L328.001 256L184.001 112' })));

const StyledCalendar = styled(Calendar) `
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
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
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

  button {
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
const formatDate = (date, locale) => {
    return format(date, 'MM/dd/yyyy', { locale });
};
const ScheduleCalendar = ({ availableTimeslots, onDaySelected, selectedDay, borderRadius, primaryColor, primaryColorFaded, locale, }) => {
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [r, g, b, alpha] = rgba(primaryColor) || [0, 0, 0, 1];
    const primaryColorToday = `rgba(${r},${g},${b},${alpha / 4.5})`;
    useEffect(() => {
        const daysInTimeslots = [];
        availableTimeslots.map((slot) => {
            if (!isValid(new Date(slot.startTime)))
                throw new Error(`Invalid date for start time on slot ${slot.id}`);
            if (!isValid(new Date(slot.endTime)))
                throw new Error(`Invalid date for end time on slot ${slot.id}`);
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
    const _onClickDay = (day) => {
        onDaySelected(day);
    };
    const _isTileDisabled = (props) => {
        return props.view === 'month' && !daysAvailable.some((date) => date === formatDate(props.date, locale));
    };
    const _renderClassName = (props) => {
        if (daysAvailable.some((date) => date === formatDate(props.date, locale)))
            return ['day-tile', 'active-day-tile'];
        return (props.view === 'month' && 'day-tile') || null;
    };
    return (React__default.createElement(StyledCalendar, { borderRadius: borderRadius, primaryColor: primaryColor, primaryColorFaded: primaryColorFaded, primaryColorToday: primaryColorToday, defaultView: 'month', onClickDay: _onClickDay, showNavigation: false, tileDisabled: _isTileDisabled, tileClassName: _renderClassName, value: selectedDay, activeStartDate: startOfMonth(selectedDay) }));
};

const ThemedButton = styled.button `
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
const StartTimeGridItemButton = styled.button `
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: white;
  background-color: ${({ primaryColor }) => primaryColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  @media (max-width: 768px) {
    padding: 7px 12px;
  }
  :hover {
    opacity: 0.8;
  }
`;

/* eslint-disable  */
const Container$1 = styled.div `
  display: flex;
  width: 100%;
  align-items: center;
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
  color: #222320;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
const StartTimeListItem = ({ onStartTimeSelect, startTimeEvent, selected, onCancelClicked, borderRadius, primaryColor, primaryColorFaded, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, locale }) => {
    return (React__default.createElement(Container$1, { className: "rsm-start-time-item" },
        React__default.createElement(ThemedButton, { type: "button", className: "rsm-confirm-button", selected: Boolean(selected), borderRadius: borderRadius, primaryColorFaded: primaryColorFaded, primaryColor: primaryColor, onClick: onStartTimeSelect },
            selected && `${lang_confirmButtonText} `,
            format(startTimeEvent.startTime, format_startTimeFormatString, { locale })),
        selected && (React__default.createElement(CancelButton, { type: "button", className: "rsm-cancel-button", borderRadius: borderRadius, onClick: onCancelClicked }, lang_cancelButtonText))));
};

const ScrollListContainer = styled.div `
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;
const GridContainer = styled.div `
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
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
  font-size: 18px;
`;
const NoTimesAvailableContainer = styled.div `
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GoToNextAvailableDayButton = styled(ThemedButton) `
  border: none;
  padding: 6px 18px;
  width: auto;
  text-align: left;
  p {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  small {
    font-weight: 700;
  }
  display: flex;
  align-items: center;
  svg {
    margin-left: 14px;
    margin-right: -4px;
  }
`;
const NoFutureTimesText = styled(StyledP) `
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const StartTimeList = ({ startTimeListItems = [], onStartTimeSelect, emptyListContentEl, lang_emptyListText, borderRadius, primaryColorFaded, primaryColor, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, lang_goToNextAvailableDayText, lang_noFutureTimesText, onGoToNextAvailableDayClick, nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, startTimeListStyle, locale, }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    const _onStartTimeSelect = (startTimeEvent, index) => {
        if (selectedItemIndex === index) {
            onStartTimeSelect(startTimeEvent);
        }
        else {
            setSelectedItemIndex(index);
        }
    };
    const emptyListElement = (React__default.createElement(NoTimesAvailableContainer, null,
        emptyListContentEl || React__default.createElement(StyledP, { className: "rsm-empty-list-text" }, lang_emptyListText),
        nextFutureStartTimeAvailable ? (React__default.createElement(GoToNextAvailableDayButton, { type: "button", selected: true, className: "rsm-next-available-date-button", borderRadius: borderRadius, primaryColorFaded: primaryColorFaded, primaryColor: primaryColor, onClick: onGoToNextAvailableDayClick },
            React__default.createElement("p", null,
                React__default.createElement("small", null, lang_goToNextAvailableDayText),
                React__default.createElement("br", null),
                format(nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, { locale })),
            React__default.createElement(Arrow, { direction: "forward" }))) : (React__default.createElement(NoFutureTimesText, { borderRadius: borderRadius, className: "rsm-no-future-times-text" }, lang_noFutureTimesText))));
    return (React__default.createElement(React__default.Fragment, null, startTimeListItems.length === 0 ? (emptyListElement) : startTimeListStyle === 'scroll-list' ? (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(ScrollEdgeFade, { className: "top" }),
        React__default.createElement(ScrollEdgeFade, { className: "bottom" }),
        React__default.createElement(ScrollListContainer, null, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(React__default.Fragment, { key: i },
            React__default.createElement(StartTimeListItem, { locale: locale, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, format_startTimeFormatString: format_startTimeFormatString, primaryColorFaded: primaryColorFaded, borderRadius: borderRadius, primaryColor: primaryColor, onCancelClicked: () => setSelectedItemIndex(-1), selected: i === selectedItemIndex, startTimeEvent: startTimeEvent, onStartTimeSelect: () => _onStartTimeSelect(startTimeEvent, i) }),
            i !== startTimeListItems.length - 1 && (React__default.createElement(ListItemDivider, { makeTransparent: selectedItemIndex === i || selectedItemIndex === i + 1 })))))))) : (React__default.createElement(GridContainer, null, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(StartTimeGridItemButton, { key: i, type: "button", primaryColorFaded: primaryColorFaded, borderRadius: borderRadius, primaryColor: primaryColor, onClick: () => onStartTimeSelect(startTimeEvent) }, format(startTimeEvent.startTime, format_startTimeFormatString, { locale }))))))));
};

const Container = styled.div `
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
  font-size: 24px;
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
  color: #222320;
  &:hover {
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.03);
  }
`;
const ScheduleMeeting = ({ availableTimeslots = [], borderRadius = 0, primaryColor = '#3f5b85', emptyListContentEl, lang_emptyListText = 'No times available', eventStartTimeSpreadInMinutes = 0, eventDurationInMinutes = 30, onSelectedDayChange, onStartTimeSelect, scheduleMeetingStyles, defaultDate, format_selectedDateDayTitleFormatString = 'cccc, LLLL do', format_selectedDateMonthTitleFormatString = 'LLLL yyyy', format_startTimeFormatString = 'h:mm a', lang_confirmButtonText = 'Confirm', lang_cancelButtonText = 'Cancel', lang_noFutureTimesText = 'No future times available', lang_goToNextAvailableDayText = 'Next Available', format_nextFutureStartTimeAvailableFormatString = 'cccc, LLLL do', onNoFutureTimesAvailable, startTimeListStyle = 'grid', locale, }) => {
    const [r, g, b, alpha] = rgba(primaryColor) || [0, 0, 0, 1];
    const primaryColorRGB = `rgba(${r},${g},${b},${alpha})`;
    const primaryColorFaded = `rgba(${r},${g},${b},${alpha / 9})`;
    const [selectedDay, setSelectedDay] = React__default.useState(new Date());
    const [startTimeEventsList, setStartTimeEventsList] = React__default.useState([]);
    const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React__default.useState([]);
    const [nextFutureStartTimeAvailable, setNextFutureStartTimeAvailable] = React__default.useState();
    const [orderedAvailableTimeslots, setOrderedAvailableTimeslots] = React__default.useState([]);
    useEffect(() => {
        const _orderedAvailableTimeslots = [...availableTimeslots];
        _orderedAvailableTimeslots.sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });
        setOrderedAvailableTimeslots(_orderedAvailableTimeslots);
    }, [availableTimeslots]);
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
        for (const availableTimeslot of orderedAvailableTimeslots) {
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
        // set initial display date
        if (defaultDate) {
            setSelectedDay(defaultDate);
        }
        setStartTimeEventsList(startTimeEvents);
    }, [orderedAvailableTimeslots, eventDurationInMinutes, eventStartTimeSpreadInMinutes, defaultDate]);
    useEffect(() => {
        var _a;
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
        const _nextFutureStartTimeAvailable = (_a = startTimeEventsList.find((startTime) => isAfter(startTime.startTime, selectedDay) && !isToday(startTime.startTime))) === null || _a === void 0 ? void 0 : _a.startTime;
        if (startTimeEventsList.length > 0 &&
            onNoFutureTimesAvailable &&
            !_nextFutureStartTimeAvailable &&
            orderedEvents.length === 0) {
            onNoFutureTimesAvailable(selectedDay);
        }
        setNextFutureStartTimeAvailable(_nextFutureStartTimeAvailable);
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
    const handleGoToNextAvailableDay = () => {
        if (nextFutureStartTimeAvailable) {
            setSelectedDay(nextFutureStartTimeAvailable);
        }
    };
    return (React__default.createElement(Container, null,
        React__default.createElement(Inner, { borderRadius: borderRadius, style: scheduleMeetingStyles },
            React__default.createElement(CalendarContainer, null,
                React__default.createElement(Header, null,
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", borderRadius: borderRadius, onClick: goToPreviousMonth },
                        React__default.createElement(Arrow, { direction: "back" })),
                    React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, format(selectedDay, format_selectedDateMonthTitleFormatString, { locale })),
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", borderRadius: borderRadius, onClick: goToNextMonth },
                        React__default.createElement(Arrow, { direction: "forward" }))),
                React__default.createElement(ScheduleCalendar, { locale: locale, borderRadius: borderRadius, primaryColor: primaryColorRGB, selectedDay: selectedDay, availableTimeslots: orderedAvailableTimeslots, primaryColorFaded: primaryColorFaded, onDaySelected: onDaySelected })),
            React__default.createElement(Divider, null),
            React__default.createElement(StartTimeListContainer, null,
                React__default.createElement(StartTimeListContainerAbsolute, null,
                    React__default.createElement(Header, null,
                        React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", borderRadius: borderRadius, onClick: goToPreviousDay },
                            React__default.createElement(Arrow, { direction: "back" })),
                        React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, format(selectedDay, format_selectedDateDayTitleFormatString, { locale })),
                        React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", borderRadius: borderRadius, onClick: goToNextDay },
                            React__default.createElement(Arrow, { direction: "forward" }))),
                    React__default.createElement(StartTimeList, { locale: locale, format_nextFutureStartTimeAvailableFormatString: format_nextFutureStartTimeAvailableFormatString, nextFutureStartTimeAvailable: nextFutureStartTimeAvailable, lang_goToNextAvailableDayText: lang_goToNextAvailableDayText, lang_noFutureTimesText: lang_noFutureTimesText, onGoToNextAvailableDayClick: handleGoToNextAvailableDay, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, lang_emptyListText: lang_emptyListText, primaryColorFaded: primaryColorFaded, primaryColor: primaryColorRGB, borderRadius: borderRadius, emptyListContentEl: emptyListContentEl, onStartTimeSelect: _onStartTimeSelect, startTimeListItems: selectedDayStartTimeEventsList, format_startTimeFormatString: format_startTimeFormatString, startTimeListStyle: startTimeListStyle }))))));
};

export { ScheduleMeeting };
