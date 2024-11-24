import { api } from "../utils/axios";
import { Seller } from "./types/seller";

export interface SignUpBody {
  name: string;
  phone: string;
  avatarId: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export async function signUp(body: SignUpBody): Promise<{ seller: Seller }> {
  const respose = await api.post<{ seller: Seller }>("/sellers", body);

  return respose.data;
}
