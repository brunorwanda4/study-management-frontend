"use server"
import { cookies } from "next/headers";
import { TOKEN_KEY, UserId,  } from "../env";

export async function setAuthCookie(token : string, userId : string) {
    const saveCookies = await cookies();
    saveCookies.set(TOKEN_KEY, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    saveCookies.set(UserId, userId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
}


export async function getUserToken() {
    const cooky = await cookies();
    return {
        userId : cooky.get(UserId)?.value,
        token : cooky.get(TOKEN_KEY)?.value,

    }
}

export async function removeUserToken() {
    const cooky = await cookies();
    cooky.delete(TOKEN_KEY)
    cooky.delete(UserId)
}