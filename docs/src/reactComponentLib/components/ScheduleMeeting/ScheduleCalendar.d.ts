import { Locale } from 'date-fns';
import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
type CalendarProps = {
    startTimeEventsList: StartTimeEvent[];
    onDaySelected: (day: Date) => void;
    selectedDay: Date;
    locale?: Locale;
};
declare const ScheduleCalendar: React.FC<CalendarProps>;
export default ScheduleCalendar;
