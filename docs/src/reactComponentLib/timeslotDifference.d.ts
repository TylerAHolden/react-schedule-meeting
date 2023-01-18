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
export declare function timeSlotDifference(availableTimeSlots: TimeSlot[], unavailableTimeSlots: TimeSlot[]): TimeSlot[];
