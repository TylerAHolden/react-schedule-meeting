import 'react-calendar/dist/Calendar.css';
import React from 'react';
import { AvailableTimeslot } from './ScheduleMeeting';
declare type CalendarProps = {
    availableTimeslots: Array<AvailableTimeslot>;
    onDaySelected: (day: Date) => void;
    selectedDay: Date;
    borderRadius: number;
    primaryColor: string;
    primaryColorFaded: string;
};
declare const ScheduleCalendar: React.FC<CalendarProps>;
export default ScheduleCalendar;
