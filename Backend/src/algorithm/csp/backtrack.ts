import { CSPDomains, Assignment, MeetingSlot } from "./types";
import { isConsistent } from "./constraints";

export function backtrack(
  assignment: Assignment,
  domains: CSPDomains
): Assignment | null {
  // حالة الانتهاء: كل المتغيرات تم تعيينها
  if (Object.keys(assignment).length === Object.keys(domains).length) {
    return assignment;
  }

  // تطبيق MRV: اختيار المتغير غير المعين الذي لديه أقل قيم متبقية في المجال
  const unassignedVars = Object.keys(domains).filter(v => !(v in assignment));
  let variable = unassignedVars[0];
  let minDomainSize = domains[variable].length;

  for (const v of unassignedVars) {
    if (domains[v].length < minDomainSize) {
      variable = v;
      minDomainSize = domains[v].length;
    }
  }

  // تجربة كل قيمة في نطاق المتغير الحالي
  for (const value of domains[variable]) {
    if (isConsistent(assignment, variable, value)) {
      assignment[variable] = value;

      // إنشاء نسخة جديدة من المجالات لتطبيق forward checking
      const newDomains: CSPDomains = { ...domains };

      // تحديث نطاقات المتغيرات الأخرى بناءً على التعيين الحالي
      let failure = false;
      for (const v of unassignedVars) {
        if (v === variable) continue;
        newDomains[v] = newDomains[v].filter(candidate =>
          isConsistent({ ...assignment, [v]: candidate }, v, candidate)
        );
        if (newDomains[v].length === 0) {
          failure = true;
          break;
        }
      }

      if (!failure) {
        // الاستدعاء التكراري مع النطاقات المحدثة
        const result = backtrack(assignment, newDomains);
        if (result) return result;
      }

      // إزالة التعيين الحالي (Backtrack)
      delete assignment[variable];
    }
  }

  return null;
}
