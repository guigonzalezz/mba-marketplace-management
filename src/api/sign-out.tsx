import { api } from "../utils/axios";

export async function signOut() {
  await api.post("/sign-out");
}
