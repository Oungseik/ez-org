import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, organization as organizationPlugin } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/tursodatabase/database";
import { account, session, user, verification } from "./schema/core";
import { invitation, member, organization } from "./schema/organization";
import { relations } from "./schema/relations";

const db = drizzle(process.env.AUTH_DATABASE_URL!, {
  schema: { user, session, account, verification, invitation, member, organization },
  relations,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  experimental: { joins: true },

  emailAndPassword: { enabled: true, requireEmailVerification: true },
  plugins: [jwt(), organizationPlugin()],
});
