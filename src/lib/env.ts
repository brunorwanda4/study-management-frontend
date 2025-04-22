import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // ✅ Server-side environment variables
  server: {
    API_ENDPOINT: z.string().min(1, "Missing API_ENDPOINT"),
  },

  // ✅ Client-side environment variables (prefixed with NEXT_PUBLIC_)
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1, "Missing NEXT_PUBLIC_API_BASE_URL"),
    NEXT_PUBLIC_APP_ENV: z.enum(["development", "production", "staging"]).optional(),
  },

  // ✅ This pulls from `process.env` at runtime
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  },

  // Treats empty strings as undefined (so validation fails)
  emptyStringAsUndefined: true,
});

export const TOKEN_KEY= "accessToken"
export const UserId = "current-user"
export const SchoolTokenKey = "school-token-key"