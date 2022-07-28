import React, { useState } from 'react';
import { Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { CirclePicker } from 'react-color';
import Layout from '@theme/Layout';
import { ScheduleMeeting } from '../reactComponentLib';
import { format } from 'date-fns';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home() {
  const [startTimeListStyle, setStartTimeListStyle] = useState('grid');
  const [eventDurationInMinutes, setEventDurationInMinutes] = useState(30);
  const [eventStartTimeSpreadInMinutes, setEventStartTimeSpreadInMinutes] = useState(10);
  const [borderRadius, setBorderRadius] = useState(10);
  const [primaryColor, setPrimaryColor] = useState('#3f5b85');
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });

  const handleTimeslotClicked = (startTimeEventEmit) => {
    alert(`Time selected: ${format(startTimeEventEmit.startTime, 'cccc, LLLL do h:mm a')}`);
  };

  return (
    <Layout title={`React Schedule Meeting Example`} description="A simplistic agnostic UI for scheduling">
      <main>
        <div className="main-example-container">
          <div className="main-content">
            <div className="main-content-inner">
              <h1>React Schedule Meeting</h1>
              <p>{siteConfig.tagline}</p>
              <ScheduleMeeting
                eventStartTimeSpreadInMinutes={eventStartTimeSpreadInMinutes}
                borderRadius={borderRadius}
                primaryColor={primaryColor}
                eventDurationInMinutes={eventDurationInMinutes}
                availableTimeslots={availableTimeslots}
                onStartTimeSelect={handleTimeslotClicked}
                onNoFutureTimesAvailable={console.log}
                startTimeListStyle={startTimeListStyle}
              />
            </div>
            <div className="options-container">
              <h3>Playground Options!</h3>
              <div className="custom-card">
                <h5>startTimeListStyle</h5>
                <ToggleButtonGroup
                  color="primary"
                  value={startTimeListStyle}
                  exclusive
                  onChange={(_, value) => setStartTimeListStyle(value)}
                >
                  <ToggleButton value="grid">grid</ToggleButton>
                  <ToggleButton value="scroll-list">Scroll-list</ToggleButton>
                </ToggleButtonGroup>
                <p>The style for the start times</p>
              </div>
              <div className="custom-card">
                <h5>eventDurationInMinutes</h5>
                <Slider
                  aria-label="eventDurationInMinutes"
                  value={eventDurationInMinutes}
                  valueLabelDisplay="auto"
                  defaultValue={30}
                  step={10}
                  min={10}
                  max={120}
                  onChange={(_, value) => setEventDurationInMinutes(value)}
                />
                <p>The minutes of each event</p>
              </div>
              <div className="custom-card">
                <h5>eventStartTimeSpreadInMinutes</h5>
                <Slider
                  aria-label="eventStartTimeSpreadInMinutes"
                  value={eventStartTimeSpreadInMinutes}
                  valueLabelDisplay="auto"
                  defaultValue={10}
                  step={5}
                  min={0}
                  max={60}
                  onChange={(_, value) => setEventStartTimeSpreadInMinutes(value)}
                />
                <p>
                  The length between the next possible event start time.{' '}
                  <i>
                    Example: For 30, an event start time will be available 30 minutes after the previous event END time.
                  </i>
                </p>
              </div>
              <div className="custom-card">
                <h5>borderRadius</h5>
                <Slider
                  aria-label="borderRadius"
                  value={borderRadius}
                  valueLabelDisplay="auto"
                  defaultValue={10}
                  step={1}
                  min={0}
                  max={20}
                  onChange={(_, value) => setBorderRadius(value)}
                />
                <p>The border radius setting that restyles the entire UI.</p>
              </div>
              <div className="custom-card">
                <h5>primaryColor</h5>
                <CirclePicker
                  value={primaryColor}
                  color={primaryColor}
                  onChange={(newValue) => setPrimaryColor(newValue.hex)}
                />
                <p>The primary color setting that restyles the entire UI.</p>
              </div>
              <div className="view-all-props">
                <a href="/docs/all-props">View All Props {'->'}</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
