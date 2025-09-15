'use server';
import { TOKEN_KEY } from '@/lib/env';
import { AuthUserDto, AuthUserSchema } from '@/lib/schema/user/user.dto';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

interface JwtClaims {
  user: AuthUserDto;
  exp: number;
  iat: number;
}

export interface AuthUserResult {
  user: AuthUserDto;
  token: string;
}

export async function authUser(): Promise<AuthUserResult | null> {
  const cooky = await cookies();
  const token = cooky.get(TOKEN_KEY)?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtClaims>(token);

    const parsed = AuthUserSchema.safeParse(decoded.user);
    if (!parsed.success) {
      console.error('❌ Invalid user schema in token', parsed.error);
      return null;
    }

    return {
      user: parsed.data,
      token,
    };
  } catch (err) {
    console.error('❌ Failed to decode JWT:', err);
    return null;
  }
}
