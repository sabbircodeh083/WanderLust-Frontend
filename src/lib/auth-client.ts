import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Same-origin by default: the auth handler lives at /api/auth in this Next app.
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});
