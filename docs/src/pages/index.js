import Layout from '@theme/Layout';
import React from 'react';
import { ScheduleMeeting } from '../reactComponentLib';
import { format } from 'date-fns';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
  return {
    id,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
  };
});

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

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
                borderRadius={10}
                primaryColor="#3f5b85"
                eventDurationInMinutes={30}
                availableTimeslots={availableTimeslots}
                onStartTimeSelect={handleTimeslotClicked}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
