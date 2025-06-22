import { backtrack } from "./backtrack";
import { CSPDomains, Assignment } from "./types";

const domains: CSPDomains = {
  newMeeting: [
    { time: "2025-06-14 09:00:00", room: "A" },
    { time: "2025-06-14 10:00:00", room: "B" },
  ]
};

const assignment: Assignment = {};

const result = backtrack(assignment, domains);
console.log("CSP backtrack result:", result);
