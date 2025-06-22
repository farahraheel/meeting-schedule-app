import { Assignment, MeetingSlot } from "./types";

export function isConsistent(
  assignment: Assignment, 
  variable: string, 
  value: MeetingSlot
): boolean {
  for (const key in assignment) {
    const assignedSlot = assignment[key];
    if (assignedSlot) {
      // شرط التداخل: إذا كانت الغرفة نفسها وتتداخل أوقات الاجتماعات
      if (
        assignedSlot.room === value.room &&
        assignedSlot.startTime < value.endTime &&
        assignedSlot.endTime > value.startTime
      ) {
        return false; // تعارض بسبب تداخل الوقت ونفس الغرفة
      }
    }
  }
  return true; // لا تعارض
}

