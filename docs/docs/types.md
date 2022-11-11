---
id: types
title: Types
---

# Types

### AvailableTimeslot

```ts
type AvailableTimeslot = {
  startTime: Date;
  endTime: Date;
  id?: string | number | undefined;
};
```

### StartTimeEventEmit

```ts
type StartTimeEventEmit = {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
  splitTimeslot?: [SplitTimeslot, SplitTimeslot];
  resetDate: () => void;
  resetConfirmState: () => void;
};
```

### SplitTimeslot

```ts
type SplitTimeslot = null | ModifiedTimeslot;

type ModifiedTimeslot = AvailableTimeslot & {
  oldId: string | number | undefined;
};
```
