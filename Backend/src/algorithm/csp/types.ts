import { Rooms } from "../../4-models/meeting-model";

export interface MeetingSlot {
  startTime: string;
  endTime: string;
  room: Rooms; // استخدام enum Rooms بدلاً من string عادي
}

export interface CSPDomains {
  [variable: string]: MeetingSlot[];
}

export interface Assignment {
  [variable: string]: MeetingSlot | null;
}
