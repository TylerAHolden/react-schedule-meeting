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
    format_startTimeFormatString: string;
    lang_confirmButtonText: string;
    lang_cancelButtonText: string;
};
declare const StartTimeListItem: React.FC<Props>;
export default StartTimeListItem;
