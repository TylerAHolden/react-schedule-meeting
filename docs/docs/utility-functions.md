---
id: utility-functions
title: Utility Functions
---

# Utility Functions

## timeslotDifference

Included in the package is a utility function `timeslotDifference` to easily get an array of available timeslots _less_ an array of unavailable timeslots. In other words, if you have an array of timeslots that are available and a separate array of timeslots that are unavailable, this utility function will start with the available timeslots and remove any time from an intersecting unavailable timeslot.

```js
import { timeslotDifference } from 'react-schedule-meeting';

const availableTimeslots = [
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

const unavailableTimeslots = [
  {
    startTime: new Date('2023-01-01T09:15:00.000Z'),
    endTime: new Date('2023-01-01T09:45:00.000Z'),
  },
];

const availableTimeslotsLessUnavailableTimeslots = timeslotDifference(availableTimeslots, unavailableTimeslots);

console.log(availableTimeslotsLessUnavailableTimeslots);
// [
//   {
//     startTime: new Date('2023-01-01T09:00:00.000Z'),
//     endTime: new Date('2023-01-01T09:15:00.000Z'),
//   },
//     // *Note that the originally available timeslot has been
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
