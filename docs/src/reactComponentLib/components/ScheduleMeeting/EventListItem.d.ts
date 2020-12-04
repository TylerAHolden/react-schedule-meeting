import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
declare type Props = {
    onStartTimeSelect: () => void;
    startTimeEvent: StartTimeEvent;
    selected?: boolean;
    onCancelClicked: () => void;
    borderRadius: number;
    primaryColor: string;
    primaryColorFaded: string;
};
declare const EventListItem: React.FC<Props>;
export default EventListItem;
