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

Since this UI only has a few spots where language text is used, simple props have been added to replace the default text. The lang props, format props and the date-fns locale prop should be enough to translate everything to your needs.

Make sure you pass a valid date-fns Locale to the locale prop... It can't be a string. Read more about date-fns locales [here](https://date-fns.org/v2.29.3/docs/I18n).

```jsx
import { enUS } from 'date-fns/locale';

<ScheduleMeeting
  // ... other props

  // Language props
  lang_cancelButtonText="Cancel"
  lang_confirmButtonText="Confirm"
  lang_emptyListText="No times available"
  lang_goToNextAvailableDayText="Next Available"
  lang_noFutureTimesText="No future times available"
  // Date format props
  format_nextFutureStartTimeAvailableFormatString="cccc, LLLL do"
  format_selectedDateDayTitleFormatString="cccc, LLLL do"
  format_selectedDateMonthTitleFormatString="LLLL yyyy"
  format_startTimeFormatString="h:mm a"
  locale={enUS}
/>;
```
