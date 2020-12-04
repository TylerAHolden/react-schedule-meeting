---
id: usage
title: Usage
---

## Quick Start


```jsx
import { ScheduleMeeting } from 'react-schedule-meeting';


// this generates basic available timeslots for the next 6 days
const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
  return {
    id,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
  };
});
 
const ScheduleMeetingComponentInYourApp = () => {
  return (
    <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={console.log}
      />
  )
}

```

## Usage Flow Overview

1. Pass in an array of date ranges that are available for meetings
1. The ScheduleMeeting component will split them into start times based on the event duration prop
1. When a user confirms a start time, the component returns:
   - The start time selected 
   - The original time slot that was used
   - The original time slot now split into two separate time slots _(in case you need to keep track of availabilities)_

## Components

### ScheduleMeeting 

#### Example

```jsx
<ScheduleMeeting
  borderRadius={10}
  primaryColor="#3f5b85"
  eventDurationInMinutes={30}
  availableTimeslots={availableTimeslots}
  onStartTimeSelect={console.log}
/>
```

#### Props

| Name                          | Type                                      | Default   | Explanation                                                                                                                                                                                          |
| ------- | ------------- | ------ | --------------------------------- |
| availableTimeslots| [AvailableTimeslot[]](#availabletimeslot)| Required| Timeslots of available time that events can be scheduled in. _Example: If you are available every day from 9am to 5pm, you would pass in an array of AvailableTimeslots with those datetimes_ |
| borderRadius            | number                         | 0        | Border radius for many of the components                                                                                                                                           |
| emptyListContentEl            | React.ElementType                         | --        | Element displayed when the start time events list is empty                                                                                                                                           |
| eventDurationInMinutes        | number                                    | Required  | The number of minutes each event will be scheduled.|
| eventStartTimeSpreadInMinutes | number                                    | 30        | The length between the next possible event start time. _Example: For 30, an event start time will be available every 30 minutes._                                                                    |
| onSelectedDayChange           | (day: Date) => void;                      | --        | Callback for when the selected day changes on the calendar                                                                                                                                           |
| onStartTimeSelect             | (startTimeEventEmit: [StartTimeEventEmit](#starttimeeventemit)) => void; | --        | Callback for when a start time is clicked                                                                                                                                                            |
| primaryColor            | CSS Color                         | #3f5b85        | Primary color to use for the component                                                                                                                                           |
| scheduleMeetingStyles         | CSSProperties                             | undefined | Styles Object for the Schedule Calendar paper container                                                                                                                                              |





## Types

### AvailableTimeslot
```ts
type AvailableTimeslot = {
  startTime: Date;
  endTime: Date;
  id?: string | number | undefined;
};
```

### StartTimeEventEmit
```ts
type StartTimeEventEmit =  {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
  splitTimeslot?: [SplitTimeslot, SplitTimeslot];
};
```

### SplitTimeslot
```ts
type SplitTimeslot = null | ModifiedTimeslot;

type ModifiedTimeslot = AvailableTimeslot & {
  oldId: string | number | undefined;
};
```