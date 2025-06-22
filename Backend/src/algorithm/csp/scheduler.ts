import dal from "../../2-utils/dal";
import { backtrack } from "../csp/backtrack";
import { MeetingSlot, CSPDomains, Assignment } from "./types";
import { Rooms } from "../../4-models/meeting-model";

function generateCandidateSlots(date: string): MeetingSlot[] {
  const baseDate = new Date(date + "T09:00:00");
  const slots: MeetingSlot[] = [];
  const rooms = [Rooms.RED, Rooms.BLUE, Rooms.GREEN];

  for (let hour = 9; hour < 17; hour++) { // من 9 صباحاً حتى 5 مساءً
    for (const room of rooms) {
      const startTime = new Date(baseDate);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(hour + 1);

      slots.push({
        startTime: startTime.toISOString().slice(0, 19).replace('T', ' '),
        endTime: endTime.toISOString().slice(0, 19).replace('T', ' '),
        room,
      });
    }
  }
  return slots;
}

export async function suggestMeetingTime(teamId: number): Promise<MeetingSlot | null> {
  // جلب الاجتماعات الحالية للفريق من قاعدة البيانات مرتبة حسب endTime تنازلياً
  const sql = `SELECT startTime, endTime, room FROM meetings WHERE teamId = ? ORDER BY endTime DESC`;
  const existing = await dal.execute(sql, [teamId]);

  // تحويل البيانات إلى MeetingSlot
  const existingSlots: MeetingSlot[] = existing.map((m: any) => ({
    startTime: m.startTime,
    endTime: m.endTime,
    room: m.room as Rooms,
  }));

  // إيجاد آخر وقت انتهاء اجتماع للفريق (إذا لم يوجد، نعتبر بداية اليوم الحالي الساعة 8:59:59)
  let lastMeetingEndTime = existingSlots.length > 0 ? new Date(existingSlots[0].endTime) : new Date();
  lastMeetingEndTime.setHours(8, 59, 59, 0);

  // إنشاء قائمة الأوقات المرشحة بناءً على تاريخ اليوم الحالي
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const candidateSlots = generateCandidateSlots(today);

  // فلترة الأوقات لتكون بعد نهاية آخر اجتماع للفريق
  const filteredSlots = candidateSlots.filter(slot => {
    const slotStart = new Date(slot.startTime);
    return slotStart > lastMeetingEndTime;
  });

  // تصفية الأوقات التي لا تتعارض مع الاجتماعات الموجودة (الغرفة + الوقت)
  const validSlots = filteredSlots.filter(candidate =>
    !existingSlots.some(existing =>
      existing.room === candidate.room &&
      (candidate.startTime < existing.endTime && candidate.endTime > existing.startTime)
    )
  );

  const domains: CSPDomains = { newMeeting: validSlots };
  const assignment: Assignment = {};

  const result = backtrack(assignment, domains);

  return result ? result["newMeeting"] : null;
}
