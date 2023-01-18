/* eslint-disable */
import { isValid, getDay, startOfMonth, format, differenceInMinutes, addMinutes, isSameDay, isSameMinute, isPast, isAfter, isToday, subMonths, addMonths, subDays, addDays, isBefore, isEqual } from 'date-fns';
import * as React from 'react';
import React__default, { useState, useEffect } from 'react';
import Color from 'color';
import Calendar from 'react-calendar';
import { setup, styled } from 'goober';

const Arrow = ({ direction }) => (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "26", height: "26", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: direction === 'back' ? 'M328 112L184 256l144 144' : 'M184.001 400L328.001 256L184.001 112' })));

setup(React__default.createElement);
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
const formatDate = (date, locale) => {
    return format(date, 'MM/dd/yyyy', { locale });
};
const ScheduleCalendar = ({ availableTimeslots, onDaySelected, selectedDay, locale }) => {
    const [daysAvailable, setDaysAvailable] = useState([]);
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
    return (React__default.createElement(StyledCalendar, { defaultView: 'month', onClickDay: _onClickDay, showNavigation: false, tileDisabled: _isTileDisabled, tileClassName: _renderClassName, value: selectedDay, activeStartDate: startOfMonth(selectedDay) }));
};

const ThemedButton = styled('button') `
  padding: 16px;
  border: none;
  color: ${({ selected }) => selected ? `rgba(var(--primary-color-contrast-rgb), 1)` : `rgba(var(--text-color-rgb), 1)`};
  background-color: ${({ selected }) => (selected ? 'rgba(var(--primary-color-rgb), 1)' : `rgba(0,0,0,0)`)};
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: ${({ selected }) => selected ? 'rgba(var(--primary-color-rgb), 1)' : 'rgba(var(--background-color-contrast-rgb), 0.06)'};
  }
`;
const StartTimeGridItemButton = styled('button') `
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
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

const Container$1 = styled('div') `
  display: flex;
  width: 100%;
  align-items: center;
`;
const CancelButton = styled('button') `
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: var(--border-radius);
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  color: rgba(var(--text-color-rgb), 1);
  &:hover {
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;
const StartTimeListItem = ({ confirmState, onStartTimeSelect, startTimeEvent, selected, onCancelClicked, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, lang_selectedButtonText, locale, }) => {
    return (React__default.createElement(Container$1, { className: "rsm-start-time-item" },
        React__default.createElement(ThemedButton, { type: "button", className: "rsm-confirm-button", selected: Boolean(selected || confirmState), onClick: onStartTimeSelect },
            confirmState && !selected && `${lang_confirmButtonText} `,
            selected && `${lang_selectedButtonText} `,
            format(startTimeEvent.startTime, format_startTimeFormatString, { locale })),
        (confirmState || selected) && (React__default.createElement(CancelButton, { type: "button", className: "rsm-cancel-button", onClick: onCancelClicked }, lang_cancelButtonText))));
};

const ScrollListContainer = styled('div') `
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;
const GridContainer = styled('div') `
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
  &.has-selection {
    button:not(.is-selected) {
      opacity: 0.5;
    }
  }
`;
const ScrollEdgeFade = styled('div') `
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
  }
`;
const ListItemDivider = styled('div') `
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({ makeTransparent }) => makeTransparent ? `transparent` : `rgba(var(--background-color-contrast-rgb), 0.05)`};
`;
const StyledP = styled('p') `
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`;
const NoTimesAvailableContainer = styled('div') `
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
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`;
const StartTimeList = ({ skipConfirmCheck, selectedDay, selectedStartTime, startTimeListItems = [], onStartTimeSelect, emptyListContentEl, lang_emptyListText, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, lang_goToNextAvailableDayText, lang_noFutureTimesText, lang_selectedButtonText, onGoToNextAvailableDayClick, nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, startTimeListStyle, setSelectedStartTime, locale, }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    React__default.useEffect(() => {
        setSelectedItemIndex(-1);
    }, [selectedDay]);
    const _onStartTimeSelect = (startTimeEvent, index) => {
        if (skipConfirmCheck || selectedItemIndex === index) {
            onStartTimeSelect(startTimeEvent);
            setSelectedItemIndex(-1);
        }
        else {
            setSelectedItemIndex(index);
        }
    };
    const emptyListElement = (React__default.createElement(NoTimesAvailableContainer, null,
        React__default.createElement(React__default.Fragment, null,
            emptyListContentEl || React__default.createElement(StyledP, { className: "rsm-empty-list-text" }, lang_emptyListText),
            nextFutureStartTimeAvailable ? (React__default.createElement(GoToNextAvailableDayButton, { type: "button", selected: true, className: "rsm-next-available-date-button", onClick: onGoToNextAvailableDayClick },
                React__default.createElement("p", null,
                    React__default.createElement("small", null, lang_goToNextAvailableDayText),
                    React__default.createElement("br", null),
                    format(nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, { locale })),
                React__default.createElement(Arrow, { direction: "forward" }))) : (React__default.createElement(NoFutureTimesText, { className: "rsm-no-future-times-text" }, lang_noFutureTimesText)))));
    const handleCancelClicked = (startTimeEvent) => {
        setSelectedItemIndex(-1);
        if (selectedStartTime && startTimeEvent.startTime.getTime() === selectedStartTime) {
            setSelectedStartTime(undefined);
        }
    };
    return (React__default.createElement(React__default.Fragment, null, startTimeListItems.length === 0 ? (emptyListElement) : startTimeListStyle === 'scroll-list' ? (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(ScrollEdgeFade, { className: "top" }),
        React__default.createElement(ScrollEdgeFade, { className: "bottom" }),
        React__default.createElement(ScrollListContainer, null, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(React__default.Fragment, { key: i },
            React__default.createElement(StartTimeListItem, { locale: locale, lang_selectedButtonText: lang_selectedButtonText, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, format_startTimeFormatString: format_startTimeFormatString, onCancelClicked: () => handleCancelClicked(startTimeEvent), selected: Boolean(selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime()), confirmState: i === selectedItemIndex, startTimeEvent: startTimeEvent, onStartTimeSelect: () => _onStartTimeSelect(startTimeEvent, i) }),
            i !== startTimeListItems.length - 1 && (React__default.createElement(ListItemDivider, { makeTransparent: selectedItemIndex === i || selectedItemIndex === i + 1 })))))))) : (React__default.createElement(GridContainer, { className: selectedStartTime ? 'has-selection' : '' }, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(StartTimeGridItemButton, { key: i, type: "button", className: selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime() ? 'is-selected' : '', onClick: () => onStartTimeSelect(startTimeEvent) }, format(startTimeEvent.startTime, format_startTimeFormatString, { locale }))))))));
};

const Container = styled('div') `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --text-color-rgb: ${({ textColorRGB }) => textColorRGB};
  --primary-color-text-shade-rgb: ${({ calendarColoredTextRGB }) => calendarColoredTextRGB};
  --background-color-rgb: ${({ backgroundColorRGB }) => backgroundColorRGB};
  --background-color-contrast-rgb: ${({ backgroundColorContrastRGB }) => backgroundColorContrastRGB};
  --primary-color-rgb: ${({ primaryColorRGB }) => primaryColorRGB};
  --primary-color-contrast-rgb: ${({ primaryColorContrastRGB }) => primaryColorContrastRGB};
  --border-radius: ${({ borderRadius }) => borderRadius}px;
`;
const Inner = styled('div') `
  display: flex;
  border-radius: var(--border-radius);
  background: rgba(var(--background-color-rgb), 1);
  box-shadow: 0 5px 22px rgba(20, 21, 21, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  margin: 16px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
  }
`;
const Divider = styled('div') `
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;
const CalendarContainer = styled('div') `
  flex: 1;
`;
const StartTimeListContainer = styled('div') `
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;
const StartTimeListContainerAbsolute = styled('div') `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SelectedDayTitle = styled('h3') `
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
  color: rgba(var(--text-color-rgb), 1);
`;
const Header = styled('div') `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;
const ArrowButton = styled('button') `
  outline: none;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  color: rgba(var(--text-color-rgb), 0.7);
  &:hover {
    opacity: 0.7;
    background: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;
const ScheduleMeeting = ({ availableTimeslots = [], backgroundColor = '#ffffff', borderRadius = 0, className, defaultDate, emptyListContentEl, eventDurationInMinutes = 30, eventStartTimeSpreadInMinutes = 0, format_nextFutureStartTimeAvailableFormatString = 'cccc, LLLL do', format_selectedDateDayTitleFormatString = 'cccc, LLLL do', format_selectedDateMonthTitleFormatString = 'LLLL yyyy', format_startTimeFormatString = 'h:mm a', lang_cancelButtonText = 'Cancel', lang_confirmButtonText = 'Confirm', lang_emptyListText = 'No times available', lang_goToNextAvailableDayText = 'Next Available', lang_noFutureTimesText = 'No future times available', lang_selectedButtonText = 'Selected:', locale, onNoFutureTimesAvailable, onSelectedDayChange, onStartTimeSelect, primaryColor = '#3f5b85', scheduleMeetingStyles, selectedStartTime: _selectedStartTime, skipConfirmCheck = false, startTimeListStyle = 'grid', textColor, }) => {
    const primaryColorRGB = Color(primaryColor).rgb().array().join(',');
    const backgroundColorRGB = Color(backgroundColor).rgb().array().join(',');
    const isBackgroundColorDark = Color(backgroundColor).isDark();
    const textColorRGB = textColor || (isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34');
    const primaryColorContrastRGB = Color(primaryColor).isDark() ? '255, 255, 255' : '34, 34, 34';
    const backgroundColorContrastRGB = isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34';
    const calendarColoredTextRGB = isBackgroundColorDark
        ? Color(primaryColor).lighten(0.5).rgb().array().join(',')
        : Color(primaryColor).darken(0.5).rgb().array().join(',');
    const [selectedStartTime, setSelectedStartTime] = React__default.useState(_selectedStartTime ? _selectedStartTime.getTime() : undefined);
    const [selectedDay, setSelectedDay] = React__default.useState(new Date());
    const [startTimeEventsList, setStartTimeEventsList] = React__default.useState([]);
    const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React__default.useState([]);
    const [nextFutureStartTimeAvailable, setNextFutureStartTimeAvailable] = React__default.useState();
    const [orderedAvailableTimeslots, setOrderedAvailableTimeslots] = React__default.useState([]);
    useEffect(() => {
        setSelectedStartTime(_selectedStartTime ? _selectedStartTime.getTime() : undefined);
    }, [_selectedStartTime]);
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
        const startTimeEventEmitObject = Object.assign(Object.assign({}, startTimeEvent), { splitTimeslot: splitTimeslots, resetDate: () => setSelectedDay(defaultDate || new Date()), resetSelectedTimeState: () => setSelectedStartTime(undefined) });
        setSelectedStartTime(startTimeEvent.startTime.getTime());
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
    return (React__default.createElement(Container, { className: className, primaryColorRGB: primaryColorRGB, borderRadius: borderRadius, style: scheduleMeetingStyles, backgroundColorContrastRGB: backgroundColorContrastRGB, textColorRGB: textColorRGB, backgroundColorRGB: backgroundColorRGB, primaryColorContrastRGB: primaryColorContrastRGB, calendarColoredTextRGB: calendarColoredTextRGB },
        React__default.createElement(Inner, null,
            React__default.createElement(CalendarContainer, null,
                React__default.createElement(Header, null,
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToPreviousMonth },
                        React__default.createElement(Arrow, { direction: "back" })),
                    React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, format(selectedDay, format_selectedDateMonthTitleFormatString, { locale })),
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToNextMonth },
                        React__default.createElement(Arrow, { direction: "forward" }))),
                React__default.createElement(ScheduleCalendar, { locale: locale, selectedDay: selectedDay, availableTimeslots: orderedAvailableTimeslots, onDaySelected: onDaySelected })),
            React__default.createElement(Divider, null),
            React__default.createElement(StartTimeListContainer, null,
                React__default.createElement(StartTimeListContainerAbsolute, null,
                    React__default.createElement(Header, null,
                        React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToPreviousDay },
                            React__default.createElement(Arrow, { direction: "back" })),
                        React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, format(selectedDay, format_selectedDateDayTitleFormatString, { locale })),
                        React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToNextDay },
                            React__default.createElement(Arrow, { direction: "forward" }))),
                    React__default.createElement(StartTimeList, { skipConfirmCheck: skipConfirmCheck, selectedDay: selectedDay, selectedStartTime: selectedStartTime, locale: locale, format_nextFutureStartTimeAvailableFormatString: format_nextFutureStartTimeAvailableFormatString, nextFutureStartTimeAvailable: nextFutureStartTimeAvailable, lang_goToNextAvailableDayText: lang_goToNextAvailableDayText, lang_noFutureTimesText: lang_noFutureTimesText, onGoToNextAvailableDayClick: handleGoToNextAvailableDay, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, lang_emptyListText: lang_emptyListText, lang_selectedButtonText: lang_selectedButtonText, emptyListContentEl: emptyListContentEl, onStartTimeSelect: _onStartTimeSelect, startTimeListItems: selectedDayStartTimeEventsList, format_startTimeFormatString: format_startTimeFormatString, startTimeListStyle: startTimeListStyle, setSelectedStartTime: setSelectedStartTime }))))));
};

/**
 * @param {TimeSlot[]} availableTimeSlots
 * @param {TimeSlot[]} unavailableTimeSlots
 * @returns {TimeSlot[]} Available TimeSlots less the intersecting unavailable TimeSlots
 */
const timeSlotDifference = (availableTimeSlots, unavailableTimeSlots) => {
    if (!availableTimeSlots || !unavailableTimeSlots)
        return [];
    const _orderedAvailableTimeSlots = [...availableTimeSlots];
    const _unavailableTimeSlots = [...unavailableTimeSlots];
    _orderedAvailableTimeSlots.sort((a, b) => {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
    let cursorIndex = 0;
    while (cursorIndex < _orderedAvailableTimeSlots.length) {
        const availableSlot = _orderedAvailableTimeSlots[cursorIndex];
        try {
            const availableSlotStartTime = new Date(availableSlot.startTime);
            const availableSlotEndTime = new Date(availableSlot.endTime);
            // go ahead and make sure everything has a proper date object
            if (typeof availableSlot.startTime === 'string') {
                availableSlot.startTime = availableSlotStartTime;
            }
            if (typeof availableSlot.endTime === 'string') {
                availableSlot.endTime = availableSlotEndTime;
            }
            for (const unavailableSlot of _unavailableTimeSlots) {
                try {
                    const unavailableSlotStartTime = new Date(unavailableSlot.startTime);
                    const unavailableSlotEndTime = new Date(unavailableSlot.endTime);
                    // go ahead and make sure everything has a proper date object
                    if (typeof unavailableSlot.startTime === 'string') {
                        unavailableSlot.startTime = unavailableSlotStartTime;
                    }
                    if (typeof unavailableSlot.endTime === 'string') {
                        unavailableSlot.endTime = unavailableSlotEndTime;
                    }
                    if (isBefore(unavailableSlotStartTime, availableSlotStartTime) ||
                        isEqual(unavailableSlotStartTime, availableSlotStartTime)) {
                        if (isBefore(availableSlotStartTime, unavailableSlotEndTime)) {
                            if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
                                // |--------[-availableSlot-]---------|
                                // |-[---unavailable----]-------------|
                                availableSlot.startTime = unavailableSlotEndTime;
                            }
                            else {
                                // |--------[-availableSlot-]---------|
                                // |----[----unavailable-------]------|
                                _orderedAvailableTimeSlots.splice(cursorIndex, 1);
                                // subtract if we split or splice
                                cursorIndex--;
                            }
                        }
                    }
                    else if (isBefore(unavailableSlotStartTime, availableSlotEndTime)) {
                        if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
                            // |------[---availableSlot----]------|
                            // |-------[--unavailable---]---------|???????
                            const newSlot = Object.assign(Object.assign({}, availableSlot), { startTime: unavailableSlotEndTime });
                            availableSlot.endTime = unavailableSlotStartTime;
                            _orderedAvailableTimeSlots.splice(cursorIndex + 1, 0, newSlot);
                            // subtract if we split or splice
                            cursorIndex--;
                        }
                        else {
                            // |-----[----availableSlot----]------|
                            // |-------[----unavailable-------]---|
                            availableSlot.endTime = unavailableSlotStartTime;
                        }
                    }
                }
                catch (err) {
                    console.error('Invalid Date for unavailable slot: ', unavailableSlot);
                    throw err;
                }
            }
        }
        catch (err) {
            console.error('Invalid Date for available slot: ', availableSlot);
            throw err;
        }
        cursorIndex++;
    }
    return _orderedAvailableTimeSlots;
};

export { ScheduleMeeting, timeSlotDifference };
