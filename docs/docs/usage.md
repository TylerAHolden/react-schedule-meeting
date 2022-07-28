---
id: usage
title: Usage
---

## Quick Start

```jsx
import React from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';

export default function Example() {
  // this generates basic available timeslots for the next 6 days
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });

  return (
    <ScheduleMeeting
      borderRadius={10}
      primaryColor="#3f5b85"
      eventDurationInMinutes={30}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={console.log}
    />
  );
}
```

## Usage Flow Overview (Methodology)

1. Pass in an array of date ranges that are available for meetings
1. The ScheduleMeeting component will split them into start times based on the event duration prop
1. When a user confirms a start time, the component returns:
   - The start time selected
   - The original time slot that was used
   - The original time slot now split into two separate time slots _(in case you need to keep track of availabilities)_

> Visit [StartTimeEventEmit](./types/#StartTimeEventEmit) to see exactly what is returned
