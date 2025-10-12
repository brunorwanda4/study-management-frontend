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
