---
id: examples
title: Examples
---

# Examples

## selectedDateDayTitleFormatString

Changes the format string passed into Date-Fns for the title above the current day container

![Example banner](/assets/selectedDateDayTitleFormatString.png)

```jsx
<ScheduleMeeting
  // ... other props
  selectedDateDayTitleFormatString="cccc, LLLL do"
/>
```

<br/>
<br/>
<br/>
<br/>

## selectedDateMonthTitleFormatString

Changes the format string passed into Date-Fns for the title above the current month container

![Example banner](/assets/selectedDateMonthTitleFormatString.png)

```jsx
<ScheduleMeeting
  // ... other props
  selectedDateMonthTitleFormatString="cccc, LLLL do"
/>
```

<br/>
<br/>
<br/>
<br/>

## startTimeFormatString

Changes the format string passed into Date-Fns for each start time

![Example banner](/assets/startTimeFormatString.png)

```jsx
<ScheduleMeeting
  // ... other props
  startTimeFormatString="h:mm a"
/>
```

<br/>
<br/>
<br/>
<br/>

## Internationalization & Languages

Since this UI only has a few spots where language text is used, simple props have been added to replace the default text. A full-featured i18n could be added if there is enough of a need - [submit an issue](https://github.com/TylerAHolden/react-schedule-meeting/labels/enhancement) to let me know!

```jsx
<ScheduleMeeting
  // ... other props
  cancelButtonText="Cancel"
  confirmButtonText="Confirm"
  emptyListText="No times available"
/>
```