import {
  Locale,
  addDays,
  addMinutes,
  addMonths,
  differenceInMinutes,
  format,
  isAfter,
  isPast,
  isSameDay,
  isSameMinute,
  isToday,
  subDays,
  subMonths,
} from 'date-fns';
import React, { useEffect, useState } from 'react';

import { Arrow } from '../ArrowSVG';
import Color from 'color';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './StartTimeList';
import { styled } from 'goober';

type StyleVariables = {
  $borderRadius: number;
  $primaryColorRGB: string;
  $textColorRGB: string;
  $backgroundColorContrastRGB: string;
  $backgroundColorRGB: string;
  $primaryColorContrastRGB: string;
  $calendarColoredTextRGB: string;
}; 

const Container = styled('div')<StyleVariables>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --text-color-rgb: ${({ $textColorRGB }) => $textColorRGB};
  --primary-color-text-shade-rgb: ${({ $calendarColoredTextRGB }) => $calendarColoredTextRGB};
  --background-color-rgb: ${({ $backgroundColorRGB }) => $backgroundColorRGB};
  --background-color-contrast-rgb: ${({ $backgroundColorContrastRGB }) => $backgroundColorContrastRGB};
  --primary-color-rgb: ${({ $primaryColorRGB }) => $primaryColorRGB};
  --primary-color-contrast-rgb: ${({ $primaryColorContrastRGB }) => $primaryColorContrastRGB};
  --border-radius: ${({ $borderRadius }) => $borderRadius}px;
`;

const Inner = styled('div')`
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

const Divider = styled('div')`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;

const CalendarContainer = styled('div')`
  flex: 1;
`;

const StartTimeListContainer = styled('div')`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;

const StartTimeListContainerAbsolute = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectedDayTitle = styled('h3')`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
  color: rgba(var(--text-color-rgb), 1);
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ArrowButton = styled('button')`
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

export type AvailableTimeslot = {
  startTime: Date | string;
  endTime: Date | string;
  id?: string | number | undefined;
};

export type SplitTimeslot = null | ModifiedTimeslot;

export type ModifiedTimeslot = AvailableTimeslot & {
  oldId: string | number | undefined;
};

export type StartTimeEvent = {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
  endTime: Date;
};

export type StartTimeEventEmit = StartTimeEvent & {
  splitTimeslot?: [SplitTimeslot, SplitTimeslot];
  resetDate: () => void;
  resetSelectedTimeState: () => void;
};

type Props = {
  availableTimeslots: AvailableTimeslot[];
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
  defaultDate?: Date;
  emptyListContentEl?: React.ElementType;
  eventDurationInMinutes: number;
  eventStartTimeSpreadInMinutes?: number;
  format_nextFutureStartTimeAvailableFormatString?: string;
  format_selectedDateDayTitleFormatString?: string;
  format_selectedDateMonthTitleFormatString?: string;
  format_startTimeFormatString?: string;
  format_startTimeTextString?: string;
  lang_cancelButtonText?: string;
  lang_confirmButtonText?: string;
  lang_emptyListText?: string;
  lang_goToNextAvailableDayText?: string;
  lang_noFutureTimesText?: string;
  lang_selectedButtonText?: string;
  locale?: Locale;
  onNoFutureTimesAvailable?: (selectedDate: Date) => void;
  onSelectedDayChange?: (day: Date) => void;
  onStartTimeSelect?: (startTimeEventEmit: StartTimeEventEmit) => void;
  primaryColor?: string;
  scheduleMeetingStyles?: React.CSSProperties;
  selectedStartTime?: Date;
  skipConfirmCheck?: boolean;
  startTimeListStyle?: 'scroll-list' | 'grid';
  textColor?: string;
};

export const ScheduleMeeting: React.FC<Props> = ({
  availableTimeslots = [],
  backgroundColor = '#ffffff',
  borderRadius = 0,
  className,
  defaultDate,
  emptyListContentEl,
  eventDurationInMinutes = 30,
  eventStartTimeSpreadInMinutes = 0,
  format_nextFutureStartTimeAvailableFormatString = 'cccc, LLLL do',
  format_selectedDateDayTitleFormatString = 'cccc, LLLL do',
  format_selectedDateMonthTitleFormatString = 'LLLL yyyy',
  format_startTimeFormatString = 'h:mm a',
  format_startTimeTextString = '',
  lang_cancelButtonText = 'Cancel',
  lang_confirmButtonText = 'Confirm',
  lang_emptyListText = 'No times available',
  lang_goToNextAvailableDayText = 'Next Available',
  lang_noFutureTimesText = 'No future times available',
  lang_selectedButtonText = 'Selected:',
  locale,
  onNoFutureTimesAvailable,
  onSelectedDayChange,
  onStartTimeSelect,
  primaryColor = '#3f5b85',
  scheduleMeetingStyles,
  selectedStartTime: _selectedStartTime,
  skipConfirmCheck = false,
  startTimeListStyle = 'grid',
  textColor,
}) => {
  const primaryColorRGB = Color(primaryColor).rgb().array().join(',');
  const backgroundColorRGB = Color(backgroundColor).rgb().array().join(',');
  const isBackgroundColorDark = Color(backgroundColor).isDark();
  const textColorRGB = textColor || (isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34');
  const primaryColorContrastRGB = Color(primaryColor).isDark() ? '255, 255, 255' : '34, 34, 34';
  const backgroundColorContrastRGB = isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34';
  const calendarColoredTextRGB = isBackgroundColorDark
    ? Color(primaryColor).lighten(0.5).rgb().array().join(',')
    : Color(primaryColor).darken(0.5).rgb().array().join(',');

  const [selectedStartTime, setSelectedStartTime] = useState<number | undefined>(
    _selectedStartTime ? _selectedStartTime.getTime() : undefined,
  );
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [startTimeEventsList, setStartTimeEventsList] = useState([] as StartTimeEvent[]);
  const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = useState([] as StartTimeEvent[]);
  const [nextFutureStartTimeAvailable, setNextFutureStartTimeAvailable] = useState<undefined | Date>();

  const [orderedAvailableTimeslots, setOrderedAvailableTimeslots] = useState<AvailableTimeslot[]>([]);

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

  const onDaySelected = (day: Date) => {
    setSelectedDay(day);
    onSelectedDayChange && onSelectedDayChange(day);
  };

  const splitTimeslot = (startTimeEvent: StartTimeEvent) => {
    const splitTimeslots: [SplitTimeslot, SplitTimeslot] = [null, null];
    const minutesIntoTimeslotEventWillStart = differenceInMinutes(
      startTimeEvent.startTime,
      new Date(startTimeEvent.availableTimeslot.startTime),
    );

    if (minutesIntoTimeslotEventWillStart !== 0) {
      const newFirstTimeslot: SplitTimeslot = {
        oldId: startTimeEvent.availableTimeslot.id,
        startTime: startTimeEvent.availableTimeslot.startTime,
        endTime: addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart),
      };
      splitTimeslots[0] = newFirstTimeslot;
    }

    const startTimeOfEndingSplitTimeslot = addMinutes(
      new Date(startTimeEvent.availableTimeslot.startTime),
      minutesIntoTimeslotEventWillStart + eventDurationInMinutes,
    );
    if (differenceInMinutes(startTimeOfEndingSplitTimeslot, new Date(startTimeEvent.availableTimeslot.endTime)) !== 0) {
      const newSecondTimeslot: SplitTimeslot = {
        oldId: startTimeEvent.availableTimeslot.id,
        startTime: startTimeOfEndingSplitTimeslot,
        endTime: startTimeEvent.availableTimeslot.endTime,
      };
      splitTimeslots[1] = newSecondTimeslot;
    }

    return splitTimeslots;
  };

  const _onStartTimeSelect = (startTimeEvent: StartTimeEvent) => {
    const splitTimeslots = splitTimeslot(startTimeEvent);
    const startTimeEventEmitObject: StartTimeEventEmit = {
      ...startTimeEvent,
      splitTimeslot: splitTimeslots,
      resetDate: () => setSelectedDay(defaultDate || new Date()),
      resetSelectedTimeState: () => setSelectedStartTime(undefined),
    };

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
      const timeslotDuration = differenceInMinutes(
        new Date(availableTimeslot.endTime),
        new Date(availableTimeslot.startTime),
      );

      // this prevents start times from being created where the event duration runs past the available timeslot
      let startTimesPossible =
        Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;

      while (startTimesPossible >= 0) {

        var startDateTime = addMinutes(
          new Date(availableTimeslot.startTime),
          startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes),
        )
        const newStartTimeEvent: StartTimeEvent = {
          availableTimeslot,
          startTime: startDateTime,
          endTime: addMinutes(startDateTime, eventDurationInMinutes)
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
    const startTimeEventsToDisplay: StartTimeEvent[] = [];

    // filter out startTimeEvents so we get the list of ones to display next to the calendar
    for (const startTimeEvent of startTimeEventsList) {
      // make sure its the same day as the selected day
      if (isSameDay(startTimeEvent.startTime, selectedDay)) {
        // prevents duplicate times (in case there are multiple overlapping shifts)
        if (
          startTimeEventsToDisplay.filter((item: StartTimeEvent) =>
            isSameMinute(item.startTime, startTimeEvent.startTime),
          ).length === 0
        ) {
          if (!isPast(startTimeEvent.startTime)) {
            startTimeEventsToDisplay.push(startTimeEvent);
          }
        }
      }
    }

    // order the events by first in the day
    const orderedEvents = startTimeEventsToDisplay.sort(
      (a: StartTimeEvent, b: StartTimeEvent) => a.startTime.getTime() - b.startTime.getTime(),
    );

    const _nextFutureStartTimeAvailable = startTimeEventsList.find(
      (startTime) => isAfter(startTime.startTime, selectedDay) && !isToday(startTime.startTime),
    )?.startTime;

    if (
      startTimeEventsList.length > 0 &&
      onNoFutureTimesAvailable &&
      !_nextFutureStartTimeAvailable &&
      orderedEvents.length === 0
    ) {
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

  return (
    <Container
      className={className}
      $primaryColorRGB={primaryColorRGB}
      $borderRadius={borderRadius}
      style={scheduleMeetingStyles}
      $backgroundColorContrastRGB={backgroundColorContrastRGB}
      $textColorRGB={textColorRGB}
      $backgroundColorRGB={backgroundColorRGB}
      $primaryColorContrastRGB={primaryColorContrastRGB}
      $calendarColoredTextRGB={calendarColoredTextRGB}
    >
      <Inner>
        <CalendarContainer>
          <Header>
            <ArrowButton type="button" className="rsm-arrow-button" onClick={goToPreviousMonth}>
              <Arrow direction="back" />
            </ArrowButton>
            <SelectedDayTitle className="rsm-date-title">
              {format(selectedDay, format_selectedDateMonthTitleFormatString, { locale })}
            </SelectedDayTitle>
            <ArrowButton type="button" className="rsm-arrow-button" onClick={goToNextMonth}>
              <Arrow direction="forward" />
            </ArrowButton>
          </Header>
          <ScheduleCalendar
            locale={locale}
            selectedDay={selectedDay}
            availableTimeslots={orderedAvailableTimeslots}
            onDaySelected={onDaySelected}
          />
        </CalendarContainer>
        <Divider />
        <StartTimeListContainer>
          <StartTimeListContainerAbsolute>
            <Header>
              <ArrowButton type="button" className="rsm-arrow-button" onClick={goToPreviousDay}>
                <Arrow direction="back" />
              </ArrowButton>
              <SelectedDayTitle className="rsm-date-title">
                {format(selectedDay, format_selectedDateDayTitleFormatString, { locale })}
              </SelectedDayTitle>
              <ArrowButton type="button" className="rsm-arrow-button" onClick={goToNextDay}>
                <Arrow direction="forward" />
              </ArrowButton>
            </Header>
            <StartTimeList
              skipConfirmCheck={skipConfirmCheck}
              selectedDay={selectedDay}
              selectedStartTime={selectedStartTime}
              locale={locale}
              format_nextFutureStartTimeAvailableFormatString={format_nextFutureStartTimeAvailableFormatString}
              nextFutureStartTimeAvailable={nextFutureStartTimeAvailable}
              lang_goToNextAvailableDayText={lang_goToNextAvailableDayText}
              lang_noFutureTimesText={lang_noFutureTimesText}
              onGoToNextAvailableDayClick={handleGoToNextAvailableDay}
              lang_confirmButtonText={lang_confirmButtonText}
              lang_cancelButtonText={lang_cancelButtonText}
              lang_emptyListText={lang_emptyListText}
              lang_selectedButtonText={lang_selectedButtonText}
              emptyListContentEl={emptyListContentEl}
              onStartTimeSelect={_onStartTimeSelect}
              startTimeListItems={selectedDayStartTimeEventsList}
              format_startTimeFormatString={format_startTimeFormatString}
              format_startTimeTextString={format_startTimeTextString}
              startTimeListStyle={startTimeListStyle}
              setSelectedStartTime={setSelectedStartTime}
            />
          </StartTimeListContainerAbsolute>
        </StartTimeListContainer>
      </Inner>
    </Container>
  );
};
