export const userRoles = [
  "STUDENT",
  "ADMIN",
  "TEACHER",
  "SCHOOLSTAFF",
] as const;

export const genders = ["MALE", "FEMALE", "OTHER"] as const;

// school
export const schoolTypes = [
  "Public",
  "Private",
  "Charter",
  "International",
] as const;

export const schoolMembers = ["Mixed", "Boys", "Girls"] as const;
export const AttendanceSystems = ["Manual", "Online"] as const;

export const AffiliationTypes = [
  "Government",
  "Religious",
  "NGO",
  "Independent",
] as const;

// school data
export const StudentStatuses = [
  "Active",
  "Suspended",
  "Graduated",
  "Left",
] as const;

export const SchoolStaffTypes = ["Director", "HeadOfStudies"] as const;

export const TeacherTypes = [
  "Regular",
  "HeadTeacher",
  "SubjectTeacher",
  "Deputy",
] as const;

export const JoinStatusEnums = [
  "Pending",
  "Accepted",
  "Rejected",
  "Expired",
  "Cancelled",
] as const;

export const JoinRoleEnums = ["Teacher", "Student", "Staff"] as const;
