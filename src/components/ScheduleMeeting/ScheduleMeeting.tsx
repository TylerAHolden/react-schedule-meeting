import React, { useEffect } from 'react';
import {
  addDays,
  addMinutes,
  addMonths,
  differenceInMinutes,
  format,
  isPast,
  isSameDay,
  isSameMinute,
  subDays,
  subMonths,
} from 'date-fns';

import { Arrow } from '../ArrowSVG';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './EventList';
import rgba from 'color-rgba';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div<{ borderRadius: number }>`
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

const Divider = styled.div`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
`;

const StartTimeListContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;

const StartTimeListContainerAbsolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectedDayTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ArrowButton = styled.button<{ borderRadius: number }>`
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
};

export type StartTimeEventEmit = StartTimeEvent & {
  splitTimeslot?: [SplitTimeslot, SplitTimeslot];
};

type Props = {
  eventDurationInMinutes: number;
  eventStartTimeSpreadInMinutes?: number;
  availableTimeslots: AvailableTimeslot[];
  onSelectedDayChange?: (day: Date) => void;
  onStartTimeSelect?: (startTimeEventEmit: StartTimeEventEmit) => void;
  scheduleMeetingStyles?: React.CSSProperties;
  emptyListContentEl?: React.ElementType;
  borderRadius?: number;
  primaryColor?: string;
  defaultDate?: Date;
};

export const ScheduleMeeting: React.FC<Props> = ({
  availableTimeslots = [],
  borderRadius = 0,
  primaryColor = '#3f5b85',
  emptyListContentEl,
  eventStartTimeSpreadInMinutes = 0,
  eventDurationInMinutes = 30,
  onSelectedDayChange,
  onStartTimeSelect,
  scheduleMeetingStyles,
  defaultDate,
}) => {
  const [r, g, b, alpha] = rgba(primaryColor) || [0, 0, 0, 1];
  const primaryColorRGB = `rgba(${r},${g},${b},${alpha})`;
  const primaryColorFaded = `rgba(${r},${g},${b},${alpha / 9})`;

  const [selectedDay, setSelectedDay] = React.useState(new Date());
  const [startTimeEventsList, setStartTimeEventsList] = React.useState([] as StartTimeEvent[]);
  const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React.useState([] as StartTimeEvent[]);

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
    };

    if (onStartTimeSelect) {
      onStartTimeSelect(startTimeEventEmitObject);
    }
  };

  useEffect(() => {
    // compile a list of all possible event start times given all timeslots
    const startTimeEvents = [];

    // iterate through all available timeslots
    for (const availableTimeslot of availableTimeslots) {
      const timeslotDuration = differenceInMinutes(
        new Date(availableTimeslot.endTime),
        new Date(availableTimeslot.startTime),
      );

      // this prevents start times from being created where the event duration runs past the available timeslot
      let startTimesPossible =
        Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;

      while (startTimesPossible >= 0) {
        const newStartTimeEvent: StartTimeEvent = {
          availableTimeslot,
          startTime: addMinutes(
            new Date(availableTimeslot.startTime),
            startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes),
          ),
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
  }, [availableTimeslots, eventDurationInMinutes, eventStartTimeSpreadInMinutes, defaultDate]);

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

  return (
    <Container>
      <Inner borderRadius={borderRadius} style={scheduleMeetingStyles}>
        <CalendarContainer>
          <Header>
            <ArrowButton borderRadius={borderRadius} onClick={goToPreviousMonth}>
              <Arrow direction="back" />
            </ArrowButton>
            <SelectedDayTitle className="rsm-date-title">{format(selectedDay, 'LLLL yyyy')}</SelectedDayTitle>
            <ArrowButton borderRadius={borderRadius} onClick={goToNextMonth}>
              <Arrow direction="forward" />
            </ArrowButton>
          </Header>
          <ScheduleCalendar
            borderRadius={borderRadius}
            primaryColor={primaryColorRGB}
            selectedDay={selectedDay}
            availableTimeslots={availableTimeslots}
            primaryColorFaded={primaryColorFaded}
            onDaySelected={onDaySelected}
          />
        </CalendarContainer>
        <Divider />
        <StartTimeListContainer>
          <StartTimeListContainerAbsolute>
            <Header>
              <ArrowButton borderRadius={borderRadius} onClick={goToPreviousDay}>
                <Arrow direction="back" />
              </ArrowButton>
              <SelectedDayTitle className="rsm-date-title">{format(selectedDay, 'cccc, LLLL do')}</SelectedDayTitle>
              <ArrowButton borderRadius={borderRadius} onClick={goToNextDay}>
                <Arrow direction="forward" />
              </ArrowButton>
            </Header>
            <StartTimeList
              primaryColorFaded={primaryColorFaded}
              primaryColor={primaryColorRGB}
              borderRadius={borderRadius}
              emptyListContentEl={emptyListContentEl}
              onStartTimeSelect={_onStartTimeSelect}
              startTimeListItems={selectedDayStartTimeEventsList}
            />
          </StartTimeListContainerAbsolute>
        </StartTimeListContainer>
      </Inner>
    </Container>
  );
};
