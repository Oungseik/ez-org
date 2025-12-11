import * as s from "drizzle-orm/sqlite-core";

export const user = s.sqliteTable(
  "user",
  {
    id: s.text("id").primaryKey().notNull().unique(),
    name: s.text("name").notNull(),
    email: s.text("email").notNull(),
    emailVerified: s.text("email_verified").notNull(),
    image: s.text("image"),
    createdAt: s
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: s
      .integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [s.index("user_email_idx").on(t.email)],
);

export const session = s.sqliteTable(
  "session",
  {
    id: s.text("id").primaryKey().notNull().unique(),
    userId: s
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: s.text("token").notNull(),
    expiresAt: s.integer("expires_at", { mode: "timestamp" }).notNull(),
    ipAddress: s.text("ip_address"),
    userAgent: s.text("user_agent"),
    createdAt: s
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: s
      .integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [s.index("session_user_id_idx").on(t.userId), s.index("session_token_idx").on(t.token)],
);

export const account = s.sqliteTable(
  "account",
  {
    id: s.text("id").primaryKey().notNull().unique(),
    userId: s
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accountId: s.text("account_id").notNull(),
    providerId: s.text("provider_id").notNull(),
    accessToken: s.text("access_token"),
    refreshToken: s.text("refresh_token"),
    accessTokenExpiresAt: s.integer("access_token_expires_at", { mode: "timestamp" }),
    refreshTokenExpiresAt: s.integer("refresh_token_expires_at", { mode: "timestamp" }),
    scope: s.text("scope"),
    idToken: s.text("id_token"),
    password: s.text("password"),
    createdAt: s
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: s
      .integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [
    s.index("account_user_id_idx").on(t.userId),
    s.index("account_account_id_idx").on(t.accountId),
  ],
);

export const verification = s.sqliteTable(
  "verification",
  {
    id: s.text("id").primaryKey().notNull().unique(),
    identifier: s.text("identifier").notNull(),
    value: s.text("value").notNull(),
    expiresAt: s.integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: s
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: s
      .integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [s.index("verification_identifier_idx").on(t.identifier)],
);
