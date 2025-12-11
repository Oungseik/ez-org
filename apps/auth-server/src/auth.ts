import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/tursodatabase/database";
import { session, user } from "./schema/core";

const db = drizzle(process.env.AUTH_DATABASE_URL!, { schema: { user, session } });

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  experimental: { joins: true },

  emailAndPassword: { enabled: true, requireEmailVerification: true },
  plugins: [jwt()],
});
