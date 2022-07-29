import React from 'react';
export declare type AvailableTimeslot = {
    startTime: Date | string;
    endTime: Date | string;
    id?: string | number | undefined;
};
export declare type SplitTimeslot = null | ModifiedTimeslot;
export declare type ModifiedTimeslot = AvailableTimeslot & {
    oldId: string | number | undefined;
};
export declare type StartTimeEvent = {
    availableTimeslot: AvailableTimeslot;
    startTime: Date;
};
export declare type StartTimeEventEmit = StartTimeEvent & {
    splitTimeslot?: [SplitTimeslot, SplitTimeslot];
};
declare type Props = {
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
    format_selectedDateMonthTitleFormatString?: string;
    format_selectedDateDayTitleFormatString?: string;
    format_startTimeFormatString?: string;
    lang_emptyListText?: string;
    lang_confirmButtonText?: string;
    lang_cancelButtonText?: string;
    lang_noFutureTimesText?: string;
    lang_goToNextAvailableDayText?: string;
    format_nextFutureStartTimeAvailableFormatString?: string;
    onNoFutureTimesAvailable?: (selectedDate: Date) => void;
    startTimeListStyle?: 'scroll-list' | 'grid';
};
export declare const ScheduleMeeting: React.FC<Props>;
export {};
