import "server-only";
import { headers } from "next/headers";
import { auth } from "../auth";

export async function getServerJwtToken() {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    return token ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
