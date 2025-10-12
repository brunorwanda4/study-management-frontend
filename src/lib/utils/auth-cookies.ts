"use server";
import {
  expiresOneDay,
  expiresOneWeek,
  expiresThreeDays,
} from "@/lib/const/time-expres";
import { UserRoleDto } from "@/lib/schema/user/user-schema";
import { cookies } from "next/headers";
import {
  schoolStaffAccessTokenSchool,
  SchoolTokenKey,
  StudentAccessTokenSchool,
  TeacherAccessTokenSchool,
  TOKEN_KEY,
  UserId,
} from "../env";

export async function getUserToken() {
  const cooky = await cookies();
  return {
    userId: cooky.get(UserId)?.value,
    token: cooky.get(TOKEN_KEY)?.value,
  };
}

export async function removeUserToken() {
  const cooky = await cookies();
  cooky.delete(TOKEN_KEY);
  cooky.delete(UserId);
  cooky.delete(SchoolTokenKey);
  cooky.delete(StudentAccessTokenSchool);
  cooky.delete(TeacherAccessTokenSchool);
  cooky.delete(schoolStaffAccessTokenSchool);
}

export async function setSchoolCookies(token: string, role: UserRoleDto) {
  const cooky = await cookies();
  const key =
    role === "SCHOOLSTAFF"
      ? schoolStaffAccessTokenSchool
      : role === "TEACHER"
        ? TeacherAccessTokenSchool
        : role === "STUDENT"
          ? StudentAccessTokenSchool
          : SchoolTokenKey;
  let expires: Date = expiresOneWeek;
  if (role === "SCHOOLSTAFF") {
    expires = expiresOneDay;
  } else if (role === "TEACHER") {
    expires = expiresThreeDays;
  }

  cooky.set(key, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expires,
  });
}

export async function getSchoolToken(role: UserRoleDto) {
  const cooky = await cookies();
  const key =
    role === "SCHOOLSTAFF"
      ? schoolStaffAccessTokenSchool
      : role === "TEACHER"
        ? TeacherAccessTokenSchool
        : role === "STUDENT"
          ? StudentAccessTokenSchool
          : SchoolTokenKey;
  return cooky.get(key)?.value;
}
