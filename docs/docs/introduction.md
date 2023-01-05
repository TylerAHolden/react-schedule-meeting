---
id: introduction
title: Introduction
sidebar_label: Introduction
description: Introduction's are for getting to know a few important things before getting to work. I assume.
slug: /
---

## Motivation

We wanted a UI that was agnostic to any scheduling logic after the user has selected their slot. The intention is to have an extremely simple component that accepts available time slots and returns a selected time slot.

## Usage Flow Overview (Methodology)

1. Pass in an array of date ranges that are available for meetings
1. The ScheduleMeeting component will split them into start times based on the event duration prop
1. When a user confirms a start time, the component returns:
   - The start time selected
   - The original time slot that was used
   - The original time slot now split into two separate time slots _(in case you need to keep track of availabilities)_

> Visit [StartTimeEventEmit](./types/#StartTimeEventEmit) to see exactly what is returned

## Something missing or inaccurate?

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue](https://github.com/TylerAHolden/react-schedule-meeting) for us.
