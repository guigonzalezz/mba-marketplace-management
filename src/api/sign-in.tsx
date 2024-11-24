import { api } from "../utils/axios";

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInBody) {
  await api.post("/sellers/sessions", { email, password });
}