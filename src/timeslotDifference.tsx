import { isBefore, isEqual } from 'date-fns';

export type TimeSlot = {
  startTime: Date | string;
  endTime: Date | string;
  [key: string]: any;
};

/**
 * @param {TimeSlot[]} availableTimeSlots
 * @param {TimeSlot[]} unavailableTimeSlots
 * @returns {TimeSlot[]} Available TimeSlots less the intersecting unavailable TimeSlots
 */
export function timeSlotDifference(availableTimeSlots: TimeSlot[], unavailableTimeSlots: TimeSlot[]): TimeSlot[] {
  if (!availableTimeSlots || !unavailableTimeSlots) return [];
  const _orderedAvailableTimeSlots = [...availableTimeSlots];
  const _unavailableTimeSlots = [...unavailableTimeSlots];
  _orderedAvailableTimeSlots.sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  let cursorIndex = 0;

  while (cursorIndex < _orderedAvailableTimeSlots.length) {
    const availableSlot = _orderedAvailableTimeSlots[cursorIndex];
    try {
      const availableSlotStartTime = new Date(availableSlot.startTime);
      const availableSlotEndTime = new Date(availableSlot.endTime);
      // go ahead and make sure everything has a proper date object
      if (typeof availableSlot.startTime === 'string') {
        availableSlot.startTime = availableSlotStartTime;
      }
      if (typeof availableSlot.endTime === 'string') {
        availableSlot.endTime = availableSlotEndTime;
      }

      for (const unavailableSlot of _unavailableTimeSlots) {
        try {
          const unavailableSlotStartTime = new Date(unavailableSlot.startTime);
          const unavailableSlotEndTime = new Date(unavailableSlot.endTime);
          // go ahead and make sure everything has a proper date object
          if (typeof unavailableSlot.startTime === 'string') {
            unavailableSlot.startTime = unavailableSlotStartTime;
          }
          if (typeof unavailableSlot.endTime === 'string') {
            unavailableSlot.endTime = unavailableSlotEndTime;
          }

          if (
            isBefore(unavailableSlotStartTime, availableSlotStartTime) ||
            isEqual(unavailableSlotStartTime, availableSlotStartTime)
          ) {
            if (isBefore(availableSlotStartTime, unavailableSlotEndTime)) {
              if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
                // |--------[-availableSlot-]---------|
                // |-[---unavailable----]-------------|
                availableSlot.startTime = unavailableSlotEndTime;
              } else {
                // |--------[-availableSlot-]---------|
                // |----[----unavailable-------]------|
                _orderedAvailableTimeSlots.splice(cursorIndex, 1);
                // subtract if we split or splice
                cursorIndex--;
              }
            }
          } else if (isBefore(unavailableSlotStartTime, availableSlotEndTime)) {
            if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
              // |------[---availableSlot----]------|
              // |-------[--unavailable---]---------|???????
              const newSlot = {
                ...availableSlot,
                startTime: unavailableSlotEndTime,
              };
              availableSlot.endTime = unavailableSlotStartTime;
              _orderedAvailableTimeSlots.splice(cursorIndex + 1, 0, newSlot);
              // subtract if we split or splice
              cursorIndex--;
            } else {
              // |-----[----availableSlot----]------|
              // |-------[----unavailable-------]---|
              availableSlot.endTime = unavailableSlotStartTime;
            }
          }
        } catch (err) {
          console.error('Invalid Date for unavailable slot: ', unavailableSlot);
          throw err;
        }
      }
    } catch (err) {
      console.error('Invalid Date for available slot: ', availableSlot);
      throw err;
    }

    cursorIndex++;
  }
  return _orderedAvailableTimeSlots;
}
