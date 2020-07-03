# React Schedule Meeting

## Installation:

```
npm i react-schedule-meeting
```

or

```
yarn add react-schedule-meeting
```

## Quick Start

```
import { ScheduleMeeting } from 'react-schedule-meeting';

<ScheduleMeeting eventDurationInMinutes={30} availableTimeslots={availableTimeslots}   />

```

## ScheduleMeeting

### Props

| Name                          | Type                                      | Default   | Explanation                                                                                                                                                                                          |
| ----------------------------- | ----------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventDurationInMinutes        | number                                    | Required  | The number of minutes each event will be scheduled.                                                                                                                                                  |
| availableTimeslots            | AvailableTimeslot[]                       | Required  | Timeslots of available time that events can be scheduled in. \*Example: If you are available every day from 9am to 5pm, you would pass in an array of AvailableTimeslots with those datetimes so tha |
| eventStartTimeSpreadInMinutes | number                                    | 30        | The length between the next possible event start time. _Example: For 30, an event start time will be available every 30 minutes._                                                                    |
| onSelectedDayChange           | (day: Date) => void;                      | --        | Callback for when the selected day changes on the calendar                                                                                                                                           |
| onStartTimeSelect             | (startTimeEvent: StartTimeEvent) => void; | --        | Callback for when a start time is clicked                                                                                                                                                            |
| scheduleMeetingStyles         | CSSProperties                             | undefined | Styles Object for the Schedule Calendar paper container                                                                                                                                              |
