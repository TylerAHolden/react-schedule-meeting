import React, { Component } from 'react';
import styled from 'styled-components';

import { ScheduleMeeting } from './reactComponentLib';

const availableTimeslots = [{
    id: 1,
    startTime: new Date(2020,6,2,9,0),
    endTime: new Date(2020,6,2,17,0),
  },
  {
    id: 10,
    startTime: new Date(2020,6,2,9,0),
    endTime: new Date(2020,6,2,17,0),
  },
  {
    id: 2,
    startTime: new Date(2020,6,3,9,0),
    endTime: new Date(2020,6,3,10,0),
  },
  {
    id: 3,
    startTime: new Date(2020,6,4,9,0),
    endTime: new Date(2020,6,4,21,0),
  },
  {
    id: 4,
    startTime: new Date(2020,6,5,9,0),
    endTime: new Date(2020,6,5,11,0),
  },
];

class App extends Component {
  render() {
    return (
      <div>
        <ScheduleMeeting eventDurationInMinutes={30} availableTimeslots={availableTimeslots}   />
      </div>
    );
  }
}

export default App;
