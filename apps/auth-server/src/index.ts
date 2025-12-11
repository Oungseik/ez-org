import { auth } from "./auth";

Bun.serve({
  routes: {
    "/api/auth/*": auth.handler,
  },
  port: process.env.AUTH_PORT,
});

export * from "./auth";
