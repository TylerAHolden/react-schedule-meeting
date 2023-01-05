import { Locale } from 'date-fns';
import React from 'react';
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
export declare const ScheduleMeeting: React.FC<Props>;
export {};
