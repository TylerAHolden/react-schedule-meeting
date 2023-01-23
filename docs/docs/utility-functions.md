---
id: utility-functions
title: Utility Functions
---

# Utility Functions

## timeSlotDifference

Included in the package is a utility function `timeSlotDifference` to easily get an array of available time slots _less_ an array of unavailable time slots. In other words, if you have an array of time slots that are available and a separate array of timeslots that are unavailable, this utility function will start with the available time slots and remove any time from an intersecting unavailable time slot.

```js
import { timeSlotDifference } from 'react-schedule-meeting';

const availableTimeSlots = [
  {
    startTime: new Date('2023-01-01T09:00:00.000Z'),
    endTime: new Date('2023-01-01T12:00:00.000Z'),
  },
  {
    startTime: new Date('2023-01-01T13:30:00.000Z'),
    endTime: new Date('2023-01-01T17:00:00.000Z'),
  },
  {
    startTime: new Date('2023-01-01T18:00:00.000Z'),
    endTime: new Date('2023-01-01T19:30:00.000Z'),
  },
];

const unavailableTimeSlots = [
  {
    startTime: new Date('2023-01-01T09:15:00.000Z'),
    endTime: new Date('2023-01-01T09:45:00.000Z'),
  },
];

const availableTimeSlotsLessUnavailableTimeSlots = timeSlotDifference(availableTimeSlots, unavailableTimeSlots);

console.log(availableTimeSlotsLessUnavailableTimeSlots);
// [
//   {
//     startTime: new Date('2023-01-01T09:00:00.000Z'),
//     endTime: new Date('2023-01-01T09:15:00.000Z'),
//   },
//     // *Note that the originally available time slot has been
// .   // split here where the unavailable time has been removed.
//   {
//     startTime: new Date('2023-01-01T09:45:00.000Z'),
//     endTime: new Date('2023-01-01T12:00:00.000Z'),
//   },
//   {
//     startTime: new Date('2023-01-01T13:00:00.000Z'),
//     endTime: new Date('2023-01-01T17:00:00.000Z'),
//   },
//   {
//     startTime: new Date('2023-01-01T18:00:00.000Z'),
//     endTime: new Date('2023-01-01T19:30:00.000Z'),
//   },
// ]
```
