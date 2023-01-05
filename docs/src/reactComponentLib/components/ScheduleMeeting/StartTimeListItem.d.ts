import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
type Props = {
    onStartTimeSelect: () => void;
    startTimeEvent: StartTimeEvent;
    selected?: boolean;
    confirmState?: boolean;
    onCancelClicked: () => void;
    format_startTimeFormatString: string;
    lang_confirmButtonText: string;
    lang_cancelButtonText: string;
    lang_selectedButtonText: string;
    locale?: Locale;
};
declare const StartTimeListItem: React.FC<Props>;
export default StartTimeListItem;
