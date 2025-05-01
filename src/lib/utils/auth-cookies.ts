"use server"
import { UserRoleDto } from '@/lib/schema/user/user.dto';
import { cookies } from "next/headers";
import { schoolStaffAccessTokenSchool, SchoolTokenKey, StudentAccessTokenSchool, TeacherAccessTokenSchool, TOKEN_KEY, UserId, } from "../env";
const expiresOneWeek = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
const expiresOneDay = new Date(Date.now() + (24 * 60 * 60 * 1000))
const expiresThreeDays = new Date(Date.now() + (3 * 24 * 60 * 60 * 1000))

export async function setAuthCookie(token: string, userId: string,) {
    const saveCookies = await cookies();
    saveCookies.set(TOKEN_KEY, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: expiresOneWeek
    });

    saveCookies.set(UserId, userId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: expiresOneWeek
    });
}

export async function getUserToken() {
    const cooky = await cookies();
    return {
        userId: cooky.get(UserId)?.value,
        token: cooky.get(TOKEN_KEY)?.value,

    }
}

export async function removeUserToken() {
    const cooky = await cookies();
    cooky.delete(TOKEN_KEY)
    cooky.delete(UserId)
    cooky.delete(SchoolTokenKey)
    cooky.delete(StudentAccessTokenSchool)
    cooky.delete(TeacherAccessTokenSchool)
    cooky.delete(schoolStaffAccessTokenSchool)
}

export async function setSchoolCookies(token: string, role: UserRoleDto) {
    const cooky = await cookies();
    const key = role === "SCHOOLSTAFF" ? schoolStaffAccessTokenSchool
        : role === "TEACHER" ? TeacherAccessTokenSchool
            : role === "STUDENT" ? StudentAccessTokenSchool
                : SchoolTokenKey
    let expires: Date = expiresOneWeek;
    if (role === "SCHOOLSTAFF") {
        expires = expiresOneDay
    } else if (role === "TEACHER") {
        expires = expiresThreeDays
    }

    cooky.set(key, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        expires: expires
    });
}

export async function getSchoolToken(role: UserRoleDto) {
    const cooky = await cookies();
    const key = role === "SCHOOLSTAFF" ? schoolStaffAccessTokenSchool
        : role === "TEACHER" ? TeacherAccessTokenSchool
            : role === "STUDENT" ? StudentAccessTokenSchool
                : SchoolTokenKey
    return cooky.get(key)?.value
}
