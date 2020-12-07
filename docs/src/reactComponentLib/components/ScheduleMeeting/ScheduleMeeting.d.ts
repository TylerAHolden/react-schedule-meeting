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
};
export declare const ScheduleMeeting: React.FC<Props>;
export {};
