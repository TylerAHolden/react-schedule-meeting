import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
declare type Props = {
    startTimeListItems?: StartTimeEvent[];
    onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
    emptyListContentEl?: React.ElementType;
    borderRadius: number;
    primaryColor: string;
    primaryColorFaded: string;
    startTimeFormatString: string;
    emptyListText: string;
    confirmButtonText: string;
    cancelButtonText: string;
};
declare const StartTimeList: React.FC<Props>;
export default StartTimeList;
