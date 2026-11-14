import { authClient } from "../auth-client";

export async function getClientJwtToken() {
  try {
    const { data, error } = await authClient.token();

    if (error) return null;

    return data?.token ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
