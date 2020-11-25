import React, { Component } from 'react';
import { addDays, format, setHours, setMinutes, subDays } from 'date-fns';

import { ScheduleMeeting } from './reactComponentLib';
import { StartTimeEventEmit } from './reactComponentLib/components/ScheduleMeeting/ScheduleMeeting';

const availableTimeslots = [
  {
    id: 1,
    startTime: setMinutes(setHours(subDays(new Date(), 1), 9), 0),
    endTime: setMinutes(setHours(subDays(new Date(), 1), 17), 0),
  },
  {
    id: 10,
    startTime: setMinutes(setHours(new Date(), 9), 0),
    endTime: setMinutes(setHours(new Date(), 17), 0),
  },
  {
    id: 2,
    startTime: setMinutes(setHours(addDays(new Date(), 1), 9), 0),
    endTime: setMinutes(setHours(addDays(new Date(), 1), 17), 0),
  },
  {
    id: 3,
    startTime: setMinutes(setHours(addDays(new Date(), 3), 9), 0),
    endTime: setMinutes(setHours(addDays(new Date(), 3), 17), 0),
  },
  {
    id: 4,
    startTime: setMinutes(setHours(addDays(new Date(), 4), 9), 0),
    endTime: setMinutes(setHours(addDays(new Date(), 4), 17), 0),
  },
];

class App extends Component {
  handleTimeslotClicked = (startTimeEventEmit: StartTimeEventEmit) => {
    alert(`Time selected: ${format(startTimeEventEmit.startTime, 'cccc, LLLL do h:mm a')}`);
  };

  render() {
    return (
      <div className="main-content">
        <div className="main-content-inner">
          <h1>React Schedule Meeting Example</h1>
          <ScheduleMeeting
            borderRadius={10}
            primaryColor="#3f5b85"
            eventDurationInMinutes={60}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={this.handleTimeslotClicked}
          />
        </div>
      </div>
    );
  }
}

export default App;
