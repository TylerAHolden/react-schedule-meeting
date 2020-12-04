import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
declare type Props = {
    startTimeListItems?: StartTimeEvent[];
    onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
    emptyListContentEl?: React.ElementType;
    borderRadius: number;
    primaryColor: string;
    primaryColorFaded: string;
};
declare const EventList: React.FC<Props>;
export default EventList;
